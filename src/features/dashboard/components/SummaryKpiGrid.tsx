import { TrendingUp, TrendingDown, Shield, LineChart } from 'lucide-react';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { DashboardSummary } from '@features/dashboard/types/dashboard.types';
import { SummaryKpiCard } from './SummaryKpiCard';
import styles from './SummaryKpiGrid.module.css';

interface SummaryKpiGridProps {
  summary: DashboardSummary;
}

export function SummaryKpiGrid({ summary }: SummaryKpiGridProps) {
  const { income, expenses, emergencyFund, investments } = summary;

  return (
    <section className={styles.grid} aria-label="Resumo financeiro">
      <SummaryKpiCard
        title="Receitas"
        value={formatCurrency(income.total)}
        subtitle={`Fixas: ${formatCurrency(income.fixed)} · Variáveis: ${formatCurrency(income.variable)}`}
        icon={<TrendingUp size={20} />}
        variant="income"
      />
      <SummaryKpiCard
        title="Despesas"
        value={formatCurrency(expenses.total)}
        subtitle={`Fixas: ${formatCurrency(expenses.fixed)} · Variáveis: ${formatCurrency(expenses.variable)}`}
        icon={<TrendingDown size={20} />}
        variant="expense"
      />
      <SummaryKpiCard
        title="Reserva de emergência"
        value={formatCurrency(emergencyFund.balance)}
        subtitle={`Meta: ${formatCurrency(emergencyFund.targetAmount)} · Mov. período: ${formatCurrency(emergencyFund.periodMovements)}`}
        icon={<Shield size={20} />}
        variant="neutral"
      />
      <SummaryKpiCard
        title="Investimentos"
        value={formatCurrency(investments.totalValue)}
        subtitle={`Movimentações no período: ${formatCurrency(investments.periodMovements)}`}
        icon={<LineChart size={20} />}
        variant="investment"
      />
    </section>
  );
}
