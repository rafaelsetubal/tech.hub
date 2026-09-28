import React from 'react';
import { cn } from '@/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide' | 'full';
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', as: Component = 'div', children, ...props }, ref) => {
    const sizeClasses = {
      default: 'max-w-[1280px]',
      narrow: 'max-w-[960px]',
      wide: 'max-w-[1440px]',
      full: 'max-w-full',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'w-full mx-auto px-[20px] md:px-[32px]',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
