import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { CategoryExpenseSlice } from '@features/dashboard/types/dashboard.types';
import { DashboardPanel } from './DashboardPanel';
import styles from './ExpensesByCategoryPieChart.module.css';

interface ExpensesByCategoryPieChartProps {
  data: CategoryExpenseSlice[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: CategoryExpenseSlice }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <strong>{item.categoryName}</strong>
      <span>{formatCurrency(item.amount)}</span>
      <span>{item.percentage}%</span>
    </div>
  );
}

export function ExpensesByCategoryPieChart({ data }: ExpensesByCategoryPieChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.amount, 0);

  return (
    <DashboardPanel title="Despesas por categoria">
      {data.length === 0 ? (
        <p className={styles.empty}>Nenhuma despesa no período selecionado.</p>
      ) : (
        <div className={styles.content}>
          <div className={styles.donutWrap}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell key={entry.categoryId} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.center}>
              <span className={styles.centerLabel}>Total</span>
              <span className={styles.centerValue}>{formatCurrency(total)}</span>
            </div>
          </div>

          <ul className={styles.legend}>
            {data.map((slice) => (
              <li key={slice.categoryId} className={styles.legendRow}>
                <span className={styles.dot} style={{ background: slice.color }} aria-hidden />
                <span className={styles.legendLabel}>{slice.categoryName}</span>
                <span className={styles.legendPct}>{slice.percentage}%</span>
                <span className={styles.legendAmount}>{formatCurrency(slice.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashboardPanel>
  );
}
