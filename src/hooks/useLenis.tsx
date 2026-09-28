import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const LenisContext = createContext<Lenis | null>(null);

export interface LenisProviderProps {
  children: React.ReactNode;
  options?: Record<string, unknown>;
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If reduced motion is preferred, use native standard scrolling
    if (prefersReducedMotion) {
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      ...options,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Synchronize Lenis with GSAP ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [prefersReducedMotion, options]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Access Lenis smooth scrolling instance
 */
export function useLenis() {
  return useContext(LenisContext);
}
