import { formatCurrency } from '@shared/utils/formatCurrency';
import { ProgressBar } from '@shared/components/ui/ProgressBar';
import type { MonthlyBudgetView } from '@features/dashboard/types/dashboard.types';
import { DashboardPanel } from './DashboardPanel';
import styles from './MonthlyBudgetPanel.module.css';
import { cn } from '@shared/utils/cn';

interface MonthlyBudgetPanelProps {
  budgetView: MonthlyBudgetView;
}

export function MonthlyBudgetPanel({ budgetView }: MonthlyBudgetPanelProps) {
  const { monthLabel, lines, budget } = budgetView;

  return (
    <DashboardPanel
      title="Orçamento mensal"
      action={<span className={styles.month}>{monthLabel}</span>}
    >
      {!budget ? (
        <p className={styles.empty}>Nenhum orçamento definido para este mês.</p>
      ) : (
        <ul className={styles.lines}>
          {lines.map((line) => {
            const over = line.spentAmount > line.plannedAmount;
            return (
              <li key={line.categoryId} className={styles.line}>
                <div className={styles.lineHead}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: line.color }}
                    aria-hidden
                  />
                  <span className={styles.categoryName}>{line.categoryName}</span>
                  <span className={styles.linePct}>{line.usagePercent}%</span>
                </div>
                <ProgressBar value={line.spentAmount} max={line.plannedAmount} />
                <div className={styles.lineFoot}>
                  <span className={styles.amounts}>
                    {formatCurrency(line.spentAmount)} de {formatCurrency(line.plannedAmount)}
                  </span>
                  <span className={cn(styles.status, over && styles.over)}>
                    {over ? 'Acima do limite' : 'Dentro do limite'}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DashboardPanel>
  );
}
