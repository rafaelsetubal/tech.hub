import { ReactNode } from 'react';

/* ==========================================================================
   FLUID SYSTEM TYPES
   ========================================================================== */
export type FluidVariant = 
  | 'electric' 
  | 'blueLilac' 
  | 'aurora' 
  | 'glass' 
  | 'deep' 
  | 'lightLilac';

export type FluidSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
export type FluidBlur = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type FluidSpeed = 'slow' | 'normal' | 'fast';

export interface FluidShapeProps {
  variant?: FluidVariant;
  size?: FluidSize;
  width?: string | number;
  height?: string | number;
  opacity?: number;
  blur?: FluidBlur;
  speed?: FluidSpeed;
  rotation?: boolean | number;
  intensity?: number;
  animated?: boolean;
  parallax?: boolean | number;
  className?: string;
  children?: ReactNode;
}

/* ==========================================================================
   BUTTON TYPES
   ========================================================================== */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

/* ==========================================================================
   BADGE & CARD TYPES
   ========================================================================== */
export type BadgeVariant = 'default' | 'outline' | 'accent' | 'secondary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export type CardVariant = 'default' | 'elevated' | 'glass' | 'interactive' | 'outline';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/* ==========================================================================
   MOTION TYPES
   ========================================================================== */
export type MotionVariant = 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'clipReveal';

export interface RevealProps {
  children: ReactNode;
  variant?: MotionVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  className?: string;
}
