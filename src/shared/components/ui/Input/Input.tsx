import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import { cn } from '@shared/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  wrapperClassName?: string;
}

export function Input({
  label,
  id,
  error,
  className,
  wrapperClassName,
  ...props
}: InputProps) {
  return (
    <div className={cn(styles.wrapper, error && styles.error, wrapperClassName)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} className={cn(styles.input, className)} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
