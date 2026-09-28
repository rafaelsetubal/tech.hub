import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: 'primary' | 'secondary' | 'accent' | 'highlight' | 'muted' | 'white' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'accent',
  className,
  ...props
}) => {
  const sizeMap = {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 28,
    xl: 36,
  };

  const numericSize = typeof size === 'number' ? size : sizeMap[size];

  const colorClasses = {
    primary: 'text-brand-primary',
    secondary: 'text-brand-secondary',
    accent: 'text-brand-accent',
    highlight: 'text-brand-highlight',
    muted: 'text-text-muted',
    white: 'text-white',
    success: 'text-state-success',
    warning: 'text-state-warning',
    danger: 'text-state-danger',
  };

  return (
    <IconComponent
      size={numericSize}
      className={cn('inline-block shrink-0', colorClasses[color], className)}
      aria-hidden="true"
      {...props}
    />
  );
};
