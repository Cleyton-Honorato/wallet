import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';
import { cn } from '@shared/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
