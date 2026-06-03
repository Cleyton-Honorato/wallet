import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { CategoryExpenseSlice } from '@features/dashboard/types/dashboard.types';
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
  return (
    <section className={styles.panel} aria-label="Despesas por categoria">
      <h3 className={styles.title}>Despesas por categoria</h3>
      {data.length === 0 ? (
        <p className={styles.empty}>Nenhuma despesa no período selecionado.</p>
      ) : (
        <div className={styles.chartWrap}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.categoryId} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value: string) => (
                  <span className={styles.legendLabel}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}
