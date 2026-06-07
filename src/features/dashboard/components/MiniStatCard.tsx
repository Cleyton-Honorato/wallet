import type { ReactNode } from 'react';
import styles from './MiniStatCard.module.css';
import { cn } from '@shared/utils/cn';

export type MiniStatVariant = 'income' | 'expense' | 'investment';

interface MiniStatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  variant: MiniStatVariant;
}

/** Compact horizontal stat with a tinted icon, used beside the balance hero. */
export function MiniStatCard({ title, value, subtitle, icon, variant }: MiniStatCardProps) {
  return (
    <div className={cn(styles.card, styles[variant])}>
      <span className={styles.icon}>{icon}</span>
      <div className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.value}>{value}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
    </div>
  );
}
