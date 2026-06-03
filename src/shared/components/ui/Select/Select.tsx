import type { SelectHTMLAttributes } from 'react';
import styles from './Select.module.css';
import { cn } from '@shared/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label: string;
  options: SelectOption[];
  id: string;
  wrapperClassName?: string;
}

export function Select({
  label,
  options,
  id,
  className,
  wrapperClassName,
  ...props
}: SelectProps) {
  return (
    <div className={cn(styles.wrapper, wrapperClassName)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select id={id} className={cn(styles.select, className)} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
