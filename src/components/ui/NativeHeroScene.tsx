import { useEffect, useRef, useState } from 'react';
import { BrandSymbol } from './BrandSymbol';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { canEnhanceHero, currentHeroDevice, hasHeroRenderBudget } from '@/lib/heroCapability';

export function NativeHeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    // Keep the interactive WebGL scene off compact mobile layouts. Even on a
    // fast CPU, browser-exposed specs do not describe GPU startup cost well;
    // the SVG fallback preserves the logo without multi-second main-thread work.
    if (window.matchMedia('(max-width: 767px)').matches) return;
    if (reducedMotion || !host.current || typeof IntersectionObserver === 'undefined' || !canEnhanceHero(currentHeroDevice())) return;
    const controller = new AbortController();
    let dispose: (() => void) | undefined;
    let idle: number | undefined;
    let frame = 0;
    let started = false;
    let visible = false;
    let engaged = false;
    const fail = () => {
      setReady(false);
      controller.abort();
      dispose?.();
    };
    const enhance = async () => {
      if (controller.signal.aborted || !visible) return;
      if (!await hasHeroRenderBudget(controller.signal)) return;
      if (controller.signal.aborted || !visible || !canEnhanceHero(currentHeroDevice())) return;
      try {
        const { mountHeroScene } = await import('./heroSceneRenderer');
        if (controller.signal.aborted || !host.current) return;
        dispose = await mountHeroScene(host.current, controller.signal,
          () => { if (!controller.signal.aborted) setReady(true); }, fail);
        if (controller.signal.aborted) dispose?.();
      } catch { if (!controller.signal.aborted) fail(); }
    };
    const schedule = () => {
      if (!engaged || started || !visible || document.readyState !== 'complete' || document.hidden) return;
      started = true;
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(() => { void enhance(); });
      else frame = requestAnimationFrame(() => { void enhance(); });
    };
    const pointerIntent = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      engaged = true;
      schedule();
    };
    host.current.addEventListener('pointermove', pointerIntent, { passive: true });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    }, { threshold: 0.1 });
    observer.observe(host.current);
    window.addEventListener('load', schedule);
    document.addEventListener('visibilitychange', schedule);
    const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
    const preferenceChanged = () => { if (!canEnhanceHero(currentHeroDevice())) fail(); };
    connection?.addEventListener('change', preferenceChanged);
    return () => {
      controller.abort();
      observer.disconnect();
      host.current?.removeEventListener('pointermove', pointerIntent);
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      cancelAnimationFrame(frame);
      window.removeEventListener('load', schedule);
      document.removeEventListener('visibilitychange', schedule);
      connection?.removeEventListener('change', preferenceChanged);
      dispose?.();
    };
  }, [reducedMotion]);
  return <div className="sites-spline-art sites-native-art" aria-hidden="true">
    <div className={'sites-spline-stage' + (ready ? ' is-ready' : '')}>
      <div className="sites-spline-fallback"><BrandSymbol/></div>
      <div className="sites-spline-host" ref={host}/>
    </div>
  </div>;
}
