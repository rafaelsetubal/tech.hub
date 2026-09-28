import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'primary' | 'secondary' | 'dark' | 'transparent';
  overflow?: 'visible' | 'hidden' | 'clip';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      spacing = 'lg',
      background = 'transparent',
      overflow = 'visible',
      children,
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: 'py-0',
      sm: 'py-space-6 md:py-space-8',
      md: 'py-space-8 md:py-space-12',
      lg: 'py-space-12 md:py-space-20',
      xl: 'py-space-16 md:py-space-24',
      '2xl': 'py-space-24 md:py-space-32',
    };

    const bgClasses = {
      transparent: 'bg-transparent',
      primary: 'bg-bg-primary',
      secondary: 'bg-bg-secondary',
      dark: 'bg-bg-dark',
    };

    const overflowClasses = {
      visible: 'overflow-visible',
      hidden: 'overflow-hidden',
      clip: 'overflow-clip',
    };

    return (
      <section
        ref={ref}
        className={cn(
          'relative w-full',
          spacingClasses[spacing],
          bgClasses[background],
          overflowClasses[overflow],
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
