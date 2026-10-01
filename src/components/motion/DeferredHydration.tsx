import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';

/** Keep prerendered content readable while hydrating each section near the viewport. */
export function DeferredHydration({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [{ Section, activate }] = useState(() => {
    let activate!: () => void;
    const ready = new Promise<{ default: React.ComponentType<{ children: React.ReactNode }> }>(resolve => {
      activate = () => resolve({ default: ({ children }) => <>{children}</> });
    });
    return { Section: lazy(() => ready), activate };
  });
  // Development has no static HTML to preserve, so mount normally there.
  const deferred = typeof window !== 'undefined' && document.getElementById('root')?.dataset.prerendered === 'home';
  useEffect(() => {
    const element = host.current;
    if (!deferred || !element) return;
    if (typeof IntersectionObserver === 'undefined') { activate(); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { activate(); observer.disconnect(); }
    }, { rootMargin: '400px' });
    observer.observe(element);
    element.addEventListener('pointerdown', activate, { passive: true });
    element.addEventListener('focusin', activate);
    return () => { observer.disconnect(); element.removeEventListener('pointerdown', activate); element.removeEventListener('focusin', activate); };
  }, [deferred, activate]);
  return <div ref={host} data-deferred-section><Suspense fallback={null}>{deferred ? <Section>{children}</Section> : children}</Suspense></div>;
}
