import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { formatMonthKeyLabel, getCurrentMonthKey } from '../lib/formatters';
import styles from './Incomes.module.css';

interface MonthNavigatorProps {
  monthKey: string;
  onChange: (monthKey: string) => void;
}

export function MonthNavigator({ monthKey, onChange }: MonthNavigatorProps) {
  const [yearStr, monthStr] = monthKey.split('-');

  const goPrev = () => {
    const prev = new Date(Number(yearStr), Number(monthStr) - 2, 1);
    onChange(`${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`);
  };

  const goNext = () => {
    const next = new Date(Number(yearStr), Number(monthStr), 1);
    onChange(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`);
  };

  const isCurrentMonth = monthKey === getCurrentMonthKey();

  return (
    <div className={styles.monthNav}>
      <Button variant="ghost" size="sm" onClick={goPrev} aria-label="Mês anterior">
        <ChevronLeft size={18} />
      </Button>
      <span className={styles.monthLabel}>{formatMonthKeyLabel(monthKey)}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={goNext}
        aria-label="Próximo mês"
        disabled={isCurrentMonth}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}
