import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { RevealProps } from '@/types';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const MotionReveal: React.FC<RevealProps> = ({
  children, variant = 'slideUp', delay = 0, duration = .65,
  stagger, triggerOnScroll = true, className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useEffect(() => {
    const element = containerRef.current;
    if (reducedMotion || !element || !element.animate) return;
    const animations: Animation[] = [];
    const animate = () => {
      const targets = stagger ? Array.from(element.children) : [element];
      const start: Keyframe = { opacity: 0 };
      if (variant === 'slideUp') start.transform = 'translateY(28px)';
      if (variant === 'slideDown') start.transform = 'translateY(-28px)';
      if (variant === 'scale') start.transform = 'scale(.96)';
      if (variant === 'clipReveal') start.clipPath = 'inset(100% 0 0)';
      targets.forEach((target, index) => animations.push(target.animate(
        [start, { opacity: 1, transform: 'none', clipPath: 'inset(0)' }],
        { duration: duration * 1000, delay: (delay + index * (stagger ?? 0)) * 1000,
          easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' },
      )));
    };
    let observer: IntersectionObserver | undefined;
    if (!triggerOnScroll) animate();
    else if (typeof IntersectionObserver !== 'undefined') {
      let firstEntry = true;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // Initial viewport content stays visible; reveals are for later sections.
          if (!firstEntry) animate();
          observer?.disconnect();
        }
        firstEntry = false;
      }, { rootMargin: '0px 0px -8% 0px' });
      observer.observe(element);
    }
    return () => { observer?.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [variant, delay, duration, stagger, triggerOnScroll, reducedMotion]);
  return <div ref={containerRef} className={cn('w-full', className)}>{children}</div>;
};
