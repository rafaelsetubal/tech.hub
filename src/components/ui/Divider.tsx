import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'solid' | 'gradient' | 'glow';
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, variant = 'subtle', orientation = 'horizontal', ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';

    const variantClasses = {
      subtle: isHorizontal ? 'bg-border-subtle h-[1px] w-full' : 'bg-border-subtle w-[1px] h-full',
      solid: isHorizontal ? 'bg-border h-[1px] w-full' : 'bg-border w-[1px] h-full',
      gradient: isHorizontal
        ? 'h-[1px] w-full bg-gradient-to-r from-transparent via-border-bright to-transparent'
        : 'w-[1px] h-full bg-gradient-to-b from-transparent via-border-bright to-transparent',
      glow: isHorizontal
        ? 'h-[1px] w-full bg-gradient-to-r from-transparent via-brand-accent to-transparent shadow-glow'
        : 'w-[1px] h-full bg-gradient-to-b from-transparent via-brand-accent to-transparent shadow-glow',
    };

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn('shrink-0', variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
