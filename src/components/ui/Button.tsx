import React from 'react';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      loading = false,
      disabled,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseClasses =
      'inline-flex items-center justify-center font-medium font-body transition-all duration-normal ease-smooth select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    // Variant styles
    const variantClasses = {
      primary:
        'bg-brand-primary text-white rounded-radius-pill shadow-sm hover:shadow-glow hover:bg-blue-600 active:bg-blue-700 border border-transparent',
      secondary:
        'bg-white text-night rounded-radius-pill border border-border hover:bg-ice hover:border-white/40 shadow-xs active:bg-slate/20',
      ghost:
        'bg-transparent text-text-secondary rounded-radius-md hover:text-white hover:bg-surface active:bg-surface-elevated',
      dark:
        'bg-night text-white rounded-radius-pill border border-border hover:bg-surface-elevated hover:border-border-bright shadow-sm active:bg-surface',
    };

    // Size styles
    const sizeClasses = {
      sm: 'px-3.5 py-1.5 text-label-sm gap-1.5 min-h-[32px]',
      md: 'px-5 py-2.5 text-label-md gap-2 min-h-[42px]',
      lg: 'px-7 py-3.5 text-label-lg gap-2.5 min-h-[50px]',
    };

    const widthClasses = fullWidth ? 'w-full' : 'w-auto';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          widthClasses,
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>
        )}

        <span>{children}</span>

        {!loading && icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
