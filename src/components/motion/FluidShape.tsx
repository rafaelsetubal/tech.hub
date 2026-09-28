import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { FluidShapeProps } from '@/types';
import { gsap } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export const FluidShape: React.FC<FluidShapeProps> = ({
  variant = 'electric',
  size = 'md',
  width,
  height,
  opacity = 0.85,
  blur = '2xl',
  speed = 'normal',
  rotation = false,
  intensity = 1,
  animated = true,
  parallax = false,
  className,
  children,
}) => {
  const shapeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Variant gradient mappings
  const variantGradients = {
    electric: 'var(--gradient-electric)',
    blueLilac: 'var(--gradient-blue-lilac)',
    aurora: 'var(--gradient-aurora)',
    glass: 'var(--gradient-glass)',
    deep: 'var(--gradient-deep)',
    lightLilac: 'var(--gradient-light-lilac)',
  };

  // Blur class mappings
  const blurClasses = {
    none: 'blur-none',
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-[80px]',
  };

  // Size preset dimensions
  const sizeClasses = {
    sm: 'w-[180px] h-[180px] md:w-[240px] md:h-[240px]',
    md: 'w-[280px] h-[280px] md:w-[400px] md:h-[400px]',
    lg: 'w-[400px] h-[400px] md:w-[580px] md:h-[580px]',
    xl: 'w-[520px] h-[520px] md:w-[760px] md:h-[760px]',
    '2xl': 'w-[680px] h-[680px] md:w-[980px] md:h-[980px]',
    custom: '',
  };

  // Speed durations
  const speedDurations = {
    slow: '20s',
    normal: '14s',
    fast: '8s',
  };

  // Parallax ScrollTrigger effect with GSAP
  useEffect(() => {
    if (!parallax || prefersReducedMotion || !shapeRef.current) return;

    const element = shapeRef.current;
    const distance = typeof parallax === 'number' ? parallax : 80;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element.parentElement || element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [parallax, prefersReducedMotion]);

  // Ambient float animation class
  const animationClass =
    animated && !prefersReducedMotion ? 'animate-ambient-float' : '';

  return (
    <div
      ref={shapeRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute select-none rounded-full transition-opacity duration-slow',
        sizeClasses[size],
        blurClasses[blur],
        animationClass,
        className
      )}
      style={{
        background: variantGradients[variant],
        opacity: opacity * intensity,
        width: width,
        height: height,
        animationDuration: animated ? speedDurations[speed] : undefined,
        transform: typeof rotation === 'number' ? `rotate(${rotation}deg)` : undefined,
      }}
    >
      {children}
    </div>
  );
};
