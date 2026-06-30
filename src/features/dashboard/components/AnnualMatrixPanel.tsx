import { useMemo } from 'react';
import { DashboardPanel } from './DashboardPanel';
import { useGetDashboardMatrixQuery } from '../api/dashboardApi';
import type {
  MatrixCellStatus,
  MatrixRow,
  MatrixRowType,
  MatrixSection,
} from '../types/dashboard.types';
import {
  useSettleFixedExpenseMutation,
  useBulkSettleVariableExpensesMutation,
} from '@features/expenses/api/expensesApi';
import {
  useSettleFixedIncomeMutation,
  useBulkSettleVariableIncomesMutation,
} from '@features/incomes/api/incomesApi';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { cn } from '@shared/utils/cn';
import styles from './AnnualMatrixPanel.module.css';

const MONTH_LABELS = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

const monthKeyOf = (year: number, monthIndex: number) =>
  `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

interface AnnualMatrixPanelProps {
  year: number;
}

function Legend() {
  return (
    <div className={styles.legend}>
      <span className={styles.legendItem}>
        <span className={cn(styles.legendSwatch, styles.swatchPaid)} />
        Quitado
      </span>
      <span className={styles.legendItem}>
        <span className={cn(styles.legendSwatch, styles.swatchPartial)} />
        Parcial
      </span>
      <span className={styles.legendItem}>
        <span className={cn(styles.legendSwatch, styles.swatchPending)} />
        Pendente
      </span>
    </div>
  );
}

const statusClass: Record<MatrixCellStatus, string> = {
  none: '',
  pending: styles.pending,
  partial: styles.partial,
  paid: styles.paid,
};

export function AnnualMatrixPanel({ year }: AnnualMatrixPanelProps) {
  const { data, isLoading, error } = useGetDashboardMatrixQuery(year);
  const [settleFixedExpense] = useSettleFixedExpenseMutation();
  const [bulkSettleVarExpense] = useBulkSettleVariableExpensesMutation();
  const [settleFixedIncome] = useSettleFixedIncomeMutation();
  const [bulkSettleVarIncome] = useBulkSettleVariableIncomesMutation();

  const currentMonthIndex = useMemo(() => {
    const now = new Date();
    return now.getFullYear() === year ? now.getMonth() : -1;
  }, [year]);

  const visibleSections: MatrixSection[] = useMemo(
    () => data?.sections.filter((section) => section.rows.length > 0) ?? [],
    [data],
  );

  const hasData = visibleSections.length > 0;

  const toggleCell = (
    rowType: MatrixRowType,
    refId: number,
    monthIndex: number,
    status: MatrixCellStatus,
  ) => {
    if (status === 'none') return;
    const month = monthKeyOf(year, monthIndex);
    const settled = status !== 'paid'; // marca como quitado, exceto se já totalmente quitado
    switch (rowType) {
      case 'fixedExpense':
        void settleFixedExpense({ id: String(refId), month, paid: settled });
        break;
      case 'variableExpenseCategory':
        void bulkSettleVarExpense({ categoryId: refId, month, paid: settled });
        break;
      case 'fixedIncome':
        void settleFixedIncome({ id: String(refId), month, received: settled });
        break;
      case 'variableIncomeCategory':
        void bulkSettleVarIncome({ categoryId: refId, month, received: settled });
        break;
    }
  };

  return (
    <DashboardPanel
      title={`Contas do ano · ${year}`}
      action={data && hasData ? <Legend /> : undefined}
    >
      {isLoading ? (
        <p className={styles.state}>Carregando…</p>
      ) : error ? (
        <p className={styles.state}>Não foi possível carregar a matriz anual.</p>
      ) : !data || !hasData ? (
        <p className={styles.state}>
          Nenhum lançamento em {year}. Cadastre despesas ou receitas para ver a tabela.
        </p>
      ) : (
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headRow}>
                <th className={cn(styles.corner, styles.labelCell)}>Conta</th>
                {MONTH_LABELS.map((label, i) => (
                  <th
                    key={label}
                    className={cn(styles.num, i === currentMonthIndex && styles.currentMonth)}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleSections.map((section) => (
                <SectionGroup
                  key={section.key}
                  section={section}
                  currentMonthIndex={currentMonthIndex}
                  onToggleCell={toggleCell}
                />
              ))}

              <tr className={styles.totalRow}>
                <td className={styles.labelCell}>Total de despesas</td>
                {data.totals.expenses.map((value, i) => (
                  <td
                    key={i}
                    className={cn(styles.num, i === currentMonthIndex && styles.currentMonth)}
                  >
                    {formatCurrency(value)}
                  </td>
                ))}
              </tr>
              <tr className={styles.leftoverRow}>
                <td className={styles.labelCell}>O que sobrou</td>
                {data.totals.leftover.map((value, i) => (
                  <td
                    key={i}
                    className={cn(styles.num, i === currentMonthIndex && styles.currentMonth)}
                  >
                    <span
                      className={cn(
                        styles.pill,
                        value >= 0 ? styles.pillPositive : styles.pillNegative,
                      )}
                    >
                      {formatCurrency(value)}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </DashboardPanel>
  );
}

function SectionGroup({
  section,
  currentMonthIndex,
  onToggleCell,
}: {
  section: MatrixSection;
  currentMonthIndex: number;
  onToggleCell: (
    rowType: MatrixRowType,
    refId: number,
    monthIndex: number,
    status: MatrixCellStatus,
  ) => void;
}) {
  return (
    <>
      <tr className={styles.sectionRow}>
        <td className={styles.labelCell}>
          <span
            className={cn(
              styles.sectionDot,
              section.kind === 'income' ? styles.incomeDot : styles.expenseDot,
            )}
          />
          {section.title}
        </td>
        <td className={styles.sectionFill} colSpan={12} />
      </tr>
      {section.rows.map((row) => (
        <DataRow
          key={row.id}
          row={row}
          currentMonthIndex={currentMonthIndex}
          onToggleCell={onToggleCell}
        />
      ))}
    </>
  );
}

function DataRow({
  row,
  currentMonthIndex,
  onToggleCell,
}: {
  row: MatrixRow;
  currentMonthIndex: number;
  onToggleCell: (
    rowType: MatrixRowType,
    refId: number,
    monthIndex: number,
    status: MatrixCellStatus,
  ) => void;
}) {
  return (
    <tr className={styles.dataRow}>
      <td className={styles.labelCell} title={row.label}>
        {row.label}
      </td>
      {row.values.map((value, i) => {
        const status = row.statuses[i];
        const interactive = status !== 'none';
        return (
          <td
            key={i}
            className={cn(
              styles.num,
              statusClass[status],
              interactive && styles.clickable,
              i === currentMonthIndex && status === 'none' && styles.currentMonth,
            )}
            onClick={
              interactive
                ? () => onToggleCell(row.rowType, row.refId, i, status)
                : undefined
            }
            title={
              interactive
                ? status === 'paid'
                  ? 'Quitado — clique para reabrir'
                  : 'Clique para marcar como quitado'
                : undefined
            }
          >
            {value ? formatCurrency(value) : <span className={styles.zero}>–</span>}
          </td>
        );
      })}
    </tr>
  );
}
