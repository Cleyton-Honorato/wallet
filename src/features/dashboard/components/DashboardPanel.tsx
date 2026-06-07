import type { ReactNode } from 'react';
import styles from './DashboardPanel.module.css';
import { cn } from '@shared/utils/cn';

interface DashboardPanelProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Generic surface panel with a title row and optional trailing action. */
export function DashboardPanel({ title, action, children, className }: DashboardPanelProps) {
  return (
    <section className={cn(styles.panel, className)} aria-label={title}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {action}
      </div>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
