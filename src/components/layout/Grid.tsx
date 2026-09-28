import React from 'react';
import { cn } from '@/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  as?: React.ElementType;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 12, gap = 'md', as: Component = 'div', children, ...props }, ref) => {
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
      8: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8',
      12: 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12', // 4 col mobile, 8 col tablet, 12 col desktop
    };

    const gapClasses = {
      none: 'gap-0',
      sm: 'gap-[12px] md:gap-[16px]',
      md: 'gap-[16px] md:gap-[24px]', // Mobile 16px gutter, Desktop 24px gutter
      lg: 'gap-[24px] md:gap-[32px]',
      xl: 'gap-[32px] md:gap-[48px]',
    };

    return (
      <Component
        ref={ref}
        className={cn('grid w-full', colClasses[cols], gapClasses[gap], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';
