import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      glow = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-surface border border-border-subtle shadow-xs',
      elevated: 'bg-surface-elevated border border-border shadow-md',
      glass: 'bg-glass backdrop-blur-md border border-border shadow-lg',
      interactive:
        'bg-surface border border-border-subtle hover:border-border-bright hover:bg-surface-hover hover:shadow-md transition-all duration-normal ease-smooth cursor-pointer group',
      outline: 'bg-transparent border border-border',
    };

    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4 md:p-5',
      md: 'p-6 md:p-8',
      lg: 'p-8 md:p-10',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-radius-lg overflow-hidden',
          variantClasses[variant],
          paddingClasses[padding],
          glow && 'shadow-glow border-brand-accent/30',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
