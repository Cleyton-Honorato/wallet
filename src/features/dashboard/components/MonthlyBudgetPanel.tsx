import { formatCurrency } from '@shared/utils/formatCurrency';
import { ProgressBar } from '@shared/components/ui/ProgressBar';
import { getBudgetStatus } from '@features/budgets/lib/budgetSummary';
import type { MonthlyBudgetView } from '@features/dashboard/types/dashboard.types';
import styles from './MonthlyBudgetPanel.module.css';
import { cn } from '@shared/utils/cn';

interface MonthlyBudgetPanelProps {
  budgetView: MonthlyBudgetView;
}

export function MonthlyBudgetPanel({ budgetView }: MonthlyBudgetPanelProps) {
  const { monthLabel, totalPlanned, totalSpent, totalRemaining, usagePercent, lines, budget } =
    budgetView;
  const status = getBudgetStatus(usagePercent);

  return (
    <section className={styles.panel} aria-label="Orçamento mensal">
      <div className={styles.header}>
        <h3 className={styles.title}>Orçamento mensal</h3>
        <span className={styles.month}>{monthLabel}</span>
      </div>

      {!budget ? (
        <p className={styles.empty}>Nenhum orçamento definido para este mês.</p>
      ) : (
        <>
          <div className={styles.totals}>
            <div className={styles.totalItem}>
              <span className={styles.totalLabel}>Planejado</span>
              <span className={styles.totalValue}>{formatCurrency(totalPlanned)}</span>
            </div>
            <div className={styles.totalItem}>
              <span className={styles.totalLabel}>Gasto</span>
              <span className={styles.totalValue}>{formatCurrency(totalSpent)}</span>
            </div>
            <div className={styles.totalItem}>
              <span className={styles.totalLabel}>Restante</span>
              <span className={styles.totalValue}>{formatCurrency(totalRemaining)}</span>
            </div>
            <span className={cn(styles.badge, styles[status])}>{usagePercent}% usado</span>
          </div>

          <ProgressBar value={totalSpent} max={totalPlanned} showLabel />

          <ul className={styles.lines}>
            {lines.map((line) => (
              <li key={line.categoryId} className={styles.line}>
                <div className={styles.lineHeader}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: line.color }}
                    aria-hidden
                  />
                  <span className={styles.categoryName}>{line.categoryName}</span>
                  <span className={styles.lineAmounts}>
                    {formatCurrency(line.spentAmount)} / {formatCurrency(line.plannedAmount)}
                  </span>
                </div>
                <ProgressBar value={line.spentAmount} max={line.plannedAmount} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
