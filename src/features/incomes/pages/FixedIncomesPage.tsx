import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageContainer } from '@shared/components/layout';
import { Button } from '@shared/components/ui/Button';
import { DashboardPanel } from '@features/dashboard/components/DashboardPanel';
import { formatCurrency } from '@shared/utils/formatCurrency';
import {
  useCreateFixedIncomeMutation,
  useDeleteFixedIncomeMutation,
  useGetFixedIncomesQuery,
  useSettleFixedIncomeMutation,
  useUpdateFixedIncomeMutation,
} from '../api/incomesApi';
import { useIncomeCategories } from '../hooks/useIncomeCategories';
import type { FixedIncome } from '../types/income.types';
import { IncomeModal } from '../components/IncomeModal';
import { MonthNavigator } from '../components/MonthNavigator';
import {
  FixedIncomeForm,
  type FixedIncomeFormValues,
} from '../components/FixedIncomeForm';
import { FixedIncomeList } from '../components/FixedIncomeList';
import { getCurrentMonthKey } from '../lib/formatters';
import styles from '../components/Incomes.module.css';

export default function FixedIncomesPage() {
  const [monthKey, setMonthKey] = useState(getCurrentMonthKey);
  const { data: incomes = [], isLoading, error } = useGetFixedIncomesQuery(monthKey);
  const { categories, categoryMap, isLoading: categoriesLoading } = useIncomeCategories();
  const [createIncome, createState] = useCreateFixedIncomeMutation();
  const [updateIncome, updateState] = useUpdateFixedIncomeMutation();
  const [deleteIncome] = useDeleteFixedIncomeMutation();
  const [settleIncome] = useSettleFixedIncomeMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FixedIncome | null>(null);

  const totals = useMemo(() => {
    const active = incomes.filter((income) => income.isActive);
    const total = active.reduce((sum, income) => sum + income.amount, 0);
    const receivedCount = active.filter((income) => income.received).length;
    return { total, activeCount: active.length, totalCount: incomes.length, receivedCount };
  }, [incomes]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (income: FixedIncome) => {
    setEditing(income);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const buildPayload = (values: FixedIncomeFormValues) => ({
    categoryId: Number(values.categoryId),
    title: values.title,
    amount: values.amount,
    receiptDay: values.receiptDay,
    startDate: values.startDate,
    endDate: values.endDate || undefined,
    description: values.description || undefined,
    isActive: values.isActive,
  });

  const handleSubmit = async (values: FixedIncomeFormValues) => {
    const body = buildPayload(values);
    if (editing) {
      await updateIncome({ id: editing.id, body }).unwrap();
    } else {
      await createIncome(body).unwrap();
    }
    closeModal();
  };

  const handleDelete = async (income: FixedIncome) => {
    if (!window.confirm(`Excluir "${income.title}"?`)) return;
    await deleteIncome(income.id).unwrap();
  };

  const handleToggleActive = async (income: FixedIncome) => {
    await updateIncome({
      id: income.id,
      body: { isActive: !income.isActive },
    }).unwrap();
  };

  const handleToggleReceived = async (income: FixedIncome) => {
    await settleIncome({
      id: income.id,
      month: monthKey,
      received: !income.received,
    }).unwrap();
  };

  const isBusy = isLoading || categoriesLoading;
  const mutationError = createState.error ?? updateState.error;

  return (
    <PageContainer>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Receitas Fixas</h1>
            <p className={styles.subtitle}>
              Entradas recorrentes que se repetem todo mês
            </p>
          </div>
          <div className={styles.controls}>
            <MonthNavigator monthKey={monthKey} onChange={setMonthKey} />
            <Button variant="primary" icon={<Plus size={16} />} onClick={openCreate}>
              Nova receita
            </Button>
          </div>
        </div>

        {isBusy ? (
          <p className={styles.state}>Carregando…</p>
        ) : error ? (
          <p className={styles.error}>Não foi possível carregar as receitas fixas.</p>
        ) : categories.length === 0 ? (
          <p className={styles.empty}>
            Cadastre categorias de receita antes de criar lançamentos.
          </p>
        ) : (
          <>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Total mensal (ativas)</p>
                <p className={`${styles.summaryValue} ${styles.summaryValueIncome}`}>
                  {formatCurrency(totals.total)}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Receitas ativas</p>
                <p className={styles.summaryValue}>
                  {totals.activeCount} de {totals.totalCount}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Recebidas no mês</p>
                <p className={styles.summaryValue}>
                  {totals.receivedCount} de {totals.activeCount}
                </p>
              </div>
            </div>

            <DashboardPanel title="Suas receitas fixas">
              <FixedIncomeList
                incomes={incomes}
                categoryMap={categoryMap}
                onEdit={openEdit}
                onDelete={handleDelete}
                onToggleActive={handleToggleActive}
                onToggleReceived={handleToggleReceived}
              />
            </DashboardPanel>
          </>
        )}

        {modalOpen && (
          <IncomeModal
            title={editing ? 'Editar receita fixa' : 'Nova receita fixa'}
            subtitle="Informe os dados da entrada recorrente."
            onClose={closeModal}
          >
            <FixedIncomeForm
              key={editing?.id ?? 'new'}
              categories={categories}
              initial={editing ?? undefined}
              error={mutationError}
              isSubmitting={createState.isLoading || updateState.isLoading}
              onSubmit={handleSubmit}
              onCancel={closeModal}
            />
          </IncomeModal>
        )}
      </div>
    </PageContainer>
  );
}
