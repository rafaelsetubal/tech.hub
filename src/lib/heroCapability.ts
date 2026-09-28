export interface HeroDevice {
  cores?: number;
  memory?: number;
  touch: boolean;
  reducedMotion: boolean;
  saveData?: boolean;
  effectiveType?: string;
}

/** Unknown hardware keeps the lightweight logo; screen width is not a performance signal. */
export function canEnhanceHero(device: HeroDevice): boolean {
  return !device.reducedMotion && !device.saveData
    && !['slow-2g', '2g', '3g'].includes(device.effectiveType ?? '')
    && (device.cores ?? 0) >= 8
    // Mobile GPUs can be substantially weaker than the reported CPU. Reserve
    // the scene for unusually capable phones; otherwise keep the branded SVG.
    && (device.memory ?? 0) >= (device.touch ? 12 : 4);
}

export function currentHeroDevice(): HeroDevice {
  const info = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  return {
    cores: info.hardwareConcurrency,
    memory: info.deviceMemory,
    // Some mobile emulation environments do not report coarse pointers, but
    // still advertise touch points. Treat either signal as a touch device.
    touch: window.matchMedia('(pointer: coarse)').matches
      || navigator.maxTouchPoints > 0
      // Lighthouse's mobile emulation can report neither touch signal.
      // Viewport width identifies the mobile context, never device speed.
      || window.matchMedia('(max-width: 767px)').matches,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: info.connection?.saveData,
    effectiveType: info.connection?.effectiveType,
  };
}

/** Samples actual frame delivery before downloading WebGL code. */
export function hasHeroRenderBudget(signal: AbortSignal): Promise<boolean> {
  return new Promise(resolve => {
    let frame = 0;
    let previous = 0;
    const intervals: number[] = [];
    const finish = (ready: boolean) => {
      cancelAnimationFrame(frame);
      signal.removeEventListener('abort', abort);
      resolve(ready);
    };
    const abort = () => finish(false);
    const sample = (now: number) => {
      if (signal.aborted || document.hidden) return finish(false);
      if (previous) intervals.push(now - previous);
      previous = now;
      if (intervals.length >= 18) {
        const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
        return finish(average <= 24 && intervals.filter(value => value > 50).length <= 1);
      }
      frame = requestAnimationFrame(sample);
    };
    if (signal.aborted) return finish(false);
    signal.addEventListener('abort', abort, { once: true });
    frame = requestAnimationFrame(sample);
  });
}
