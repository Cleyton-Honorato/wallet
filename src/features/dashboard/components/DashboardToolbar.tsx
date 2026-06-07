import { Plus } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { DashboardPeriodFilter } from './DashboardPeriodFilter';
import type { DashboardPeriod } from '@features/dashboard/types/dashboard.types';
import styles from './DashboardToolbar.module.css';

interface DashboardToolbarProps {
  subtitle: string;
  period: DashboardPeriod;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onNewTransaction: () => void;
}

export function DashboardToolbar({
  subtitle,
  period,
  onYearChange,
  onMonthChange,
  onNewTransaction,
}: DashboardToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Visão geral</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.controls}>
        <DashboardPeriodFilter
          period={period}
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
        />
        <Button variant="primary" icon={<Plus size={16} />} onClick={onNewTransaction}>
          Nova transação
        </Button>
      </div>
    </div>
  );
}
