import { DASHBOARD_AVAILABLE_YEARS, DASHBOARD_MONTH_OPTIONS } from '@config/constants';
import { Select } from '@shared/components/ui/Select';
import type { DashboardPeriod } from '@features/dashboard/types/dashboard.types';
import styles from './DashboardPeriodFilter.module.css';

interface DashboardPeriodFilterProps {
  period: DashboardPeriod;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export function DashboardPeriodFilter({
  period,
  onYearChange,
  onMonthChange,
}: DashboardPeriodFilterProps) {
  const yearOptions = DASHBOARD_AVAILABLE_YEARS.map((y) => ({
    value: String(y),
    label: String(y),
  }));

  const monthOptions = DASHBOARD_MONTH_OPTIONS.map((m) => ({
    value: String(m.value),
    label: m.label,
  }));

  const monthValue = period.month ?? 0;

  return (
    <div className={styles.filter}>
      <Select
        id="dashboard-year"
        label="Ano"
        options={yearOptions}
        value={String(period.year)}
        onChange={(e) => onYearChange(Number(e.target.value))}
      />
      <Select
        id="dashboard-month"
        label="Período"
        options={monthOptions}
        value={String(monthValue)}
        onChange={(e) => onMonthChange(Number(e.target.value))}
      />
    </div>
  );
}
