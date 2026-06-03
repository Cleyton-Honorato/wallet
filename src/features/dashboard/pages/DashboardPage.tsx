import { PageContainer } from '@shared/components/layout';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { DashboardPeriodFilter } from '@features/dashboard/components/DashboardPeriodFilter';
import { SummaryKpiGrid } from '@features/dashboard/components/SummaryKpiGrid';
import { ExpensesByCategoryPieChart } from '@features/dashboard/components/ExpensesByCategoryPieChart';
import { MonthlyBudgetPanel } from '@features/dashboard/components/MonthlyBudgetPanel';
import { useDashboardPeriod } from '@features/dashboard/hooks/useDashboardPeriod';
import { useDashboardSummary } from '@features/dashboard/hooks/useDashboardSummary';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { period, setYear, setMonth } = useDashboardPeriod();
  const { summary } = useDashboardSummary(period);

  return (
    <PageContainer>
      <div className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.subtitle}>Visão geral das suas finanças</p>
          <p className={styles.periodHint}>Período: {summary.periodLabel}</p>
          <p className={styles.balance}>
            Saldo do período:{' '}
            <strong>{formatCurrency(summary.balance)}</strong>
          </p>
        </header>

        <DashboardPeriodFilter
          period={period}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />

        <SummaryKpiGrid summary={summary} />

        <section className={styles.chartsRow}>
          <ExpensesByCategoryPieChart data={summary.expensesByCategory} />
          <MonthlyBudgetPanel budgetView={summary.monthlyBudget} />
        </section>
      </div>
    </PageContainer>
  );
}
