import type { ReactNode } from 'react';
import styles from './Card.module.css';
import { cn } from '@shared/utils/cn';

export type CardVariant = 'income' | 'expense' | 'neutral' | 'investment';

interface CardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: CardVariant;
  className?: string;
}

export function Card({
  title,
  value,
  subtitle,
  icon,
  variant = 'neutral',
  className,
}: CardProps) {
  return (
    <article className={cn(styles.card, styles[variant], className)}>
      <div className={styles.header}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <span className={styles.title}>{title}</span>
      </div>
      <p className={styles.value}>{value}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </article>
  );
}
