import { useEffect } from 'react';

/** Lazy routes mount after the browser's initial fragment lookup. */
export function useInitialAnchor() {
  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}
