import { useMemo, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { PageContainer } from '@shared/components/layout';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { DashboardToolbar } from '@features/dashboard/components/DashboardToolbar';
import { BalanceHeroCard } from '@features/dashboard/components/BalanceHeroCard';
import { MiniStatCard } from '@features/dashboard/components/MiniStatCard';
import { ExpensesByCategoryPieChart } from '@features/dashboard/components/ExpensesByCategoryPieChart';
import { MonthlyBudgetPanel } from '@features/dashboard/components/MonthlyBudgetPanel';
import { RecentTransactionsPanel } from '@features/dashboard/components/RecentTransactionsPanel';
import { NewTransactionModal } from '@features/dashboard/components/NewTransactionModal';
import { useDashboardPeriod } from '@features/dashboard/hooks/useDashboardPeriod';
import { useDashboardSummary } from '@features/dashboard/hooks/useDashboardSummary';
import styles from './DashboardPage.module.css';

const FALLBACK_CATEGORIES = ['Moradia', 'Mercado', 'Alimentação', 'Transporte', 'Lazer'];

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function DashboardPage() {
  const { period, setYear, setMonth } = useDashboardPeriod();
  const { summary, isLoading, error } = useDashboardSummary(period);
  const [isNewTxOpen, setNewTxOpen] = useState(false);

  const subtitle = summary
    ? `${capitalize(summary.periodLabel)} · resumo do ${summary.period.month ? 'mês' : 'ano'}`
    : '';

  const modalCategories = useMemo(() => {
    const names = summary?.expensesByCategory.map((c) => c.categoryName) ?? [];
    return names.length > 0 ? names : FALLBACK_CATEGORIES;
  }, [summary]);

  return (
    <PageContainer>
      <div className={styles.page}>
        {isLoading && !summary ? (
          <p className={styles.state}>Carregando…</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : summary ? (
          <>
            <DashboardToolbar
              subtitle={subtitle}
              period={period}
              onYearChange={setYear}
              onMonthChange={setMonth}
              onNewTransaction={() => setNewTxOpen(true)}
            />

            <div className={styles.heroGrid}>
              <BalanceHeroCard
                balance={summary.balance}
                periodLabel={capitalize(summary.periodLabel)}
                emergencyFund={summary.emergencyFund}
              />
              <div className={styles.miniStats}>
                <MiniStatCard
                  title="Receitas"
                  value={formatCurrency(summary.income.total)}
                  subtitle={`Fixas ${formatCurrency(summary.income.fixed)} · Variáveis ${formatCurrency(summary.income.variable)}`}
                  variant="income"
                  icon={<ArrowUpRight size={18} />}
                />
                <MiniStatCard
                  title="Despesas"
                  value={formatCurrency(summary.expenses.total)}
                  subtitle={`Fixas ${formatCurrency(summary.expenses.fixed)} · Variáveis ${formatCurrency(summary.expenses.variable)}`}
                  variant="expense"
                  icon={<ArrowDownRight size={18} />}
                />
                <MiniStatCard
                  title="Investimentos"
                  value={formatCurrency(summary.investments.totalValue)}
                  subtitle={`Mov. período ${formatCurrency(summary.investments.periodMovements)}`}
                  variant="investment"
                  icon={<TrendingUp size={18} />}
                />
              </div>
            </div>

            <div className={styles.columns}>
              <ExpensesByCategoryPieChart data={summary.expensesByCategory} />
              <MonthlyBudgetPanel budgetView={summary.monthlyBudget} />
              <RecentTransactionsPanel onNewTransaction={() => setNewTxOpen(true)} />
            </div>
          </>
        ) : null}

        {isNewTxOpen && (
          <NewTransactionModal
            categories={modalCategories}
            onClose={() => setNewTxOpen(false)}
          />
        )}
      </div>
    </PageContainer>
  );
}
