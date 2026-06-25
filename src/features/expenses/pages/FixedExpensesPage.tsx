import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageContainer } from '@shared/components/layout';
import { Button } from '@shared/components/ui/Button';
import { DashboardPanel } from '@features/dashboard/components/DashboardPanel';
import { formatCurrency } from '@shared/utils/formatCurrency';
import {
  useCreateFixedExpenseMutation,
  useDeleteFixedExpenseMutation,
  useGetFixedExpensesQuery,
  useUpdateFixedExpenseMutation,
} from '../api/expensesApi';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import type { FixedExpense } from '../types/expense.types';
import { ExpenseModal } from '../components/ExpenseModal';
import {
  FixedExpenseForm,
  type FixedExpenseFormValues,
} from '../components/FixedExpenseForm';
import { FixedExpenseList } from '../components/FixedExpenseList';
import styles from '../components/Expenses.module.css';

export default function FixedExpensesPage() {
  const { data: expenses = [], isLoading, error } = useGetFixedExpensesQuery();
  const { categories, categoryMap, isLoading: categoriesLoading } = useExpenseCategories();
  const [createExpense, createState] = useCreateFixedExpenseMutation();
  const [updateExpense, updateState] = useUpdateFixedExpenseMutation();
  const [deleteExpense] = useDeleteFixedExpenseMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FixedExpense | null>(null);

  const totals = useMemo(() => {
    const active = expenses.filter((expense) => expense.isActive);
    const total = active.reduce((sum, expense) => sum + expense.amount, 0);
    return { total, activeCount: active.length, totalCount: expenses.length };
  }, [expenses]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (expense: FixedExpense) => {
    setEditing(expense);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const buildPayload = (values: FixedExpenseFormValues) => ({
    categoryId: Number(values.categoryId),
    title: values.title,
    amount: values.amount,
    dueDay: values.dueDay,
    startDate: values.startDate,
    endDate: values.endDate || undefined,
    description: values.description || undefined,
    isActive: values.isActive,
  });

  const handleSubmit = async (values: FixedExpenseFormValues) => {
    const body = buildPayload(values);
    if (editing) {
      await updateExpense({ id: editing.id, body }).unwrap();
    } else {
      await createExpense(body).unwrap();
    }
    closeModal();
  };

  const handleDelete = async (expense: FixedExpense) => {
    if (!window.confirm(`Excluir "${expense.title}"?`)) return;
    await deleteExpense(expense.id).unwrap();
  };

  const handleToggleActive = async (expense: FixedExpense) => {
    await updateExpense({
      id: expense.id,
      body: { isActive: !expense.isActive },
    }).unwrap();
  };

  const isBusy = isLoading || categoriesLoading;
  const mutationError = createState.error ?? updateState.error;

  return (
    <PageContainer>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Despesas Fixas</h1>
            <p className={styles.subtitle}>
              Gastos recorrentes que se repetem todo mês
            </p>
          </div>
          <Button variant="primary" icon={<Plus size={16} />} onClick={openCreate}>
            Nova despesa
          </Button>
        </div>

        {isBusy ? (
          <p className={styles.state}>Carregando…</p>
        ) : error ? (
          <p className={styles.error}>Não foi possível carregar as despesas fixas.</p>
        ) : categories.length === 0 ? (
          <p className={styles.empty}>
            Cadastre categorias de despesa antes de criar lançamentos.
          </p>
        ) : (
          <>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Total mensal (ativas)</p>
                <p className={`${styles.summaryValue} ${styles.summaryValueExpense}`}>
                  {formatCurrency(totals.total)}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Despesas ativas</p>
                <p className={styles.summaryValue}>
                  {totals.activeCount} de {totals.totalCount}
                </p>
              </div>
            </div>

            <DashboardPanel title="Suas despesas fixas">
              <FixedExpenseList
                expenses={expenses}
                categoryMap={categoryMap}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
              />
            </DashboardPanel>
          </>
        )}

        {modalOpen && (
          <ExpenseModal
            title={editing ? 'Editar despesa fixa' : 'Nova despesa fixa'}
            subtitle="Informe os dados do gasto recorrente."
            onClose={closeModal}
          >
            <FixedExpenseForm
              key={editing?.id ?? 'new'}
              categories={categories}
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
