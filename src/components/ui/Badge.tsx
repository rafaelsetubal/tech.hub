import React from 'react';
import { cn } from '@/lib/utils';
import { BadgeProps } from '@/types';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-surface text-text-secondary border-border-subtle',
      outline: 'bg-transparent text-text-primary border-border',
      accent: 'bg-sky/10 text-sky border-sky/30',
      secondary: 'bg-violet/10 text-lilac border-violet/30',
      success: 'bg-mint/10 text-mint border-mint/30',
      warning: 'bg-peach/10 text-peach border-peach/30',
      danger: 'bg-coral/10 text-coral border-coral/30',
    };

    const dotColors = {
      default: 'bg-slate',
      outline: 'bg-white',
      accent: 'bg-sky',
      secondary: 'bg-lilac',
      success: 'bg-mint',
      warning: 'bg-peach',
      danger: 'bg-coral',
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-label-sm gap-1',
      md: 'px-3 py-1 text-label-md gap-1.5',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-radius-pill border font-medium uppercase tracking-wider',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />
        )}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = 'Badge';
