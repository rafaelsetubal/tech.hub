import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Standard motion duration & ease presets matching Tech Hub Design Tokens
 */
export const MOTION = {
  duration: {
    fast: 0.18,
    normal: 0.35,
    slow: 0.75,
    ambient: 14,
  },
  ease: {
    standard: 'power2.out',
    smooth: 'power3.out',
    expressive: 'expo.out',
    ambient: 'sine.inOut',
  },
} as const;

/**
 * Common GSAP animation presets
 */
export const gsapPresets = {
  fadeIn: (target: gsap.DOMTarget, vars?: gsap.TweenVars) =>
    gsap.from(target, {
      opacity: 0,
      duration: MOTION.duration.normal,
      ease: MOTION.ease.smooth,
      ...vars,
    }),

  slideUp: (target: gsap.DOMTarget, vars?: gsap.TweenVars) =>
    gsap.from(target, {
      opacity: 0,
      y: 40,
      duration: MOTION.duration.slow,
      ease: MOTION.ease.expressive,
      ...vars,
    }),

  scaleIn: (target: gsap.DOMTarget, vars?: gsap.TweenVars) =>
    gsap.from(target, {
      opacity: 0,
      scale: 0.92,
      duration: MOTION.duration.normal,
      ease: MOTION.ease.expressive,
      ...vars,
    }),

  staggerSlideUp: (targets: gsap.DOMTarget, vars?: gsap.TweenVars) =>
    gsap.from(targets, {
      opacity: 0,
      y: 30,
      duration: MOTION.duration.normal,
      stagger: 0.08,
      ease: MOTION.ease.expressive,
      ...vars,
    }),

  clipReveal: (target: gsap.DOMTarget, vars?: gsap.TweenVars) =>
    gsap.fromTo(
      target,
      { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0 },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
        duration: MOTION.duration.slow,
        ease: MOTION.ease.expressive,
        ...vars,
      }
    ),
};
