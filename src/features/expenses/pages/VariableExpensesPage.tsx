import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageContainer } from '@shared/components/layout';
import { Button } from '@shared/components/ui/Button';
import { DashboardPanel } from '@features/dashboard/components/DashboardPanel';
import { formatCurrency } from '@shared/utils/formatCurrency';
import {
  useCreateVariableExpenseMutation,
  useDeleteVariableExpenseMutation,
  useGetVariableExpensesQuery,
  useUpdateVariableExpenseMutation,
} from '../api/expensesApi';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import type { VariableExpense } from '../types/expense.types';
import { ExpenseModal } from '../components/ExpenseModal';
import { MonthNavigator } from '../components/MonthNavigator';
import {
  VariableExpenseForm,
  type VariableExpenseFormValues,
  parseTagsInput,
} from '../components/VariableExpenseForm';
import { VariableExpenseList } from '../components/VariableExpenseList';
import { getCurrentMonthKey } from '../lib/formatters';
import styles from '../components/Expenses.module.css';

export default function VariableExpensesPage() {
  const [monthKey, setMonthKey] = useState(getCurrentMonthKey);
  const { data: expenses = [], isLoading, error } = useGetVariableExpensesQuery(monthKey);
  const { categories, categoryMap, isLoading: categoriesLoading } = useExpenseCategories();
  const [createExpense, createState] = useCreateVariableExpenseMutation();
  const [updateExpense, updateState] = useUpdateVariableExpenseMutation();
  const [deleteExpense] = useDeleteVariableExpenseMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<VariableExpense | null>(null);

  const totals = useMemo(() => {
    const estimated = expenses.reduce((sum, expense) => sum + expense.estimatedAmount, 0);
    const actual = expenses.reduce(
      (sum, expense) => sum + (expense.actualAmount ?? expense.estimatedAmount),
      0,
    );
    const paidCount = expenses.filter((expense) => expense.isPaid).length;
    return { estimated, actual, paidCount, totalCount: expenses.length };
  }, [expenses]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (expense: VariableExpense) => {
    setEditing(expense);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const buildPayload = (values: VariableExpenseFormValues) => {
    const actualRaw = values.actualAmount;
    const actualAmount =
      actualRaw === '' || actualRaw === undefined ? undefined : Number(actualRaw);

    return {
      categoryId: Number(values.categoryId),
      title: values.title,
      estimatedAmount: values.estimatedAmount,
      actualAmount: values.isPaid ? actualAmount ?? values.estimatedAmount : undefined,
      description: values.description || undefined,
      month: monthKey,
      isPaid: values.isPaid,
      tags: parseTagsInput(values.tags ?? ''),
    };
  };

  const handleSubmit = async (values: VariableExpenseFormValues) => {
    const body = buildPayload(values);
    if (editing) {
      await updateExpense({ id: editing.id, body }).unwrap();
    } else {
      await createExpense(body).unwrap();
    }
    closeModal();
  };

  const handleDelete = async (expense: VariableExpense) => {
    if (!window.confirm(`Excluir "${expense.title}"?`)) return;
    await deleteExpense(expense.id).unwrap();
  };

  const handleMarkPaid = async (expense: VariableExpense) => {
    await updateExpense({
      id: expense.id,
      body: {
        isPaid: true,
        actualAmount: expense.actualAmount ?? expense.estimatedAmount,
      },
    }).unwrap();
  };

  const isBusy = isLoading || categoriesLoading;
  const mutationError = createState.error ?? updateState.error;

  return (
    <PageContainer>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Despesas Variáveis</h1>
            <p className={styles.subtitle}>
              Gastos que mudam de valor a cada mês
            </p>
          </div>
          <div className={styles.controls}>
            <MonthNavigator monthKey={monthKey} onChange={setMonthKey} />
            <Button variant="primary" icon={<Plus size={16} />} onClick={openCreate}>
              Nova despesa
            </Button>
          </div>
        </div>

        {isBusy ? (
          <p className={styles.state}>Carregando…</p>
        ) : error ? (
          <p className={styles.error}>Não foi possível carregar as despesas variáveis.</p>
        ) : categories.length === 0 ? (
          <p className={styles.empty}>
            Cadastre categorias de despesa antes de criar lançamentos.
          </p>
        ) : (
          <>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Total estimado</p>
                <p className={`${styles.summaryValue} ${styles.summaryValueExpense}`}>
                  {formatCurrency(totals.estimated)}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Total efetivo</p>
                <p className={`${styles.summaryValue} ${styles.summaryValueExpense}`}>
                  {formatCurrency(totals.actual)}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Pagas</p>
                <p className={styles.summaryValue}>
                  {totals.paidCount} de {totals.totalCount}
                </p>
              </div>
            </div>

            <DashboardPanel title="Despesas do mês">
              <VariableExpenseList
                expenses={expenses}
                categoryMap={categoryMap}
                onEdit={openEdit}
                onDelete={handleDelete}
                onMarkPaid={handleMarkPaid}
              />
            </DashboardPanel>
          </>
        )}

        {modalOpen && (
          <ExpenseModal
            title={editing ? 'Editar despesa variável' : 'Nova despesa variável'}
            subtitle="Informe os dados do gasto deste mês."
            onClose={closeModal}
          >
            <VariableExpenseForm
              key={editing?.id ?? monthKey}
              categories={categories}
              monthKey={monthKey}
              initial={editing ?? undefined}
              error={mutationError}
              isSubmitting={createState.isLoading || updateState.isLoading}
              onSubmit={handleSubmit}
              onCancel={closeModal}
            />
          </ExpenseModal>
        )}
      </div>
    </PageContainer>
  );
}
