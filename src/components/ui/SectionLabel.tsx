import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  indicator?: 'dot' | 'slash' | 'symbol' | 'none';
  color?: 'accent' | 'primary' | 'secondary' | 'muted';
}

export const SectionLabel = React.forwardRef<HTMLDivElement, SectionLabelProps>(
  (
    {
      className,
      indicator = 'dot',
      color = 'accent',
      children,
      ...props
    },
    ref
  ) => {
    const colorClasses = {
      accent: 'text-brand-accent border-brand-accent/20 bg-brand-accent/5',
      primary: 'text-brand-primary border-brand-primary/20 bg-brand-primary/5',
      secondary: 'text-brand-highlight border-brand-highlight/20 bg-brand-highlight/5',
      muted: 'text-text-muted border-border-subtle bg-surface',
    };

    const dotColors = {
      accent: 'bg-brand-accent',
      primary: 'bg-brand-primary',
      secondary: 'bg-brand-highlight',
      muted: 'bg-text-muted',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1 rounded-radius-pill border text-label-sm uppercase tracking-widest font-semibold',
          colorClasses[color],
          className
        )}
        {...props}
      >
        {indicator === 'dot' && (
          <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[color])} />
        )}
        {indicator === 'slash' && <span className="opacity-40">//</span>}
        {indicator === 'symbol' && <span>✦</span>}
        <span>{children}</span>
      </div>
    );
  }
);

SectionLabel.displayName = 'SectionLabel';
