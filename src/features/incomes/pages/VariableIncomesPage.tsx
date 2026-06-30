import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageContainer } from '@shared/components/layout';
import { Button } from '@shared/components/ui/Button';
import { DashboardPanel } from '@features/dashboard/components/DashboardPanel';
import { formatCurrency } from '@shared/utils/formatCurrency';
import {
  useCreateVariableIncomeMutation,
  useDeleteVariableIncomeMutation,
  useGetVariableIncomesQuery,
  useUpdateVariableIncomeMutation,
} from '../api/incomesApi';
import { useIncomeCategories } from '../hooks/useIncomeCategories';
import type { VariableIncome } from '../types/income.types';
import { IncomeModal } from '../components/IncomeModal';
import { MonthNavigator } from '../components/MonthNavigator';
import {
  VariableIncomeForm,
  type VariableIncomeFormValues,
  parseTagsInput,
} from '../components/VariableIncomeForm';
import { VariableIncomeList } from '../components/VariableIncomeList';
import { getCurrentMonthKey } from '../lib/formatters';
import styles from '../components/Incomes.module.css';

export default function VariableIncomesPage() {
  const [monthKey, setMonthKey] = useState(getCurrentMonthKey);
  const { data: incomes = [], isLoading, error } = useGetVariableIncomesQuery(monthKey);
  const { categories, categoryMap, isLoading: categoriesLoading } = useIncomeCategories();
  const [createIncome, createState] = useCreateVariableIncomeMutation();
  const [updateIncome, updateState] = useUpdateVariableIncomeMutation();
  const [deleteIncome] = useDeleteVariableIncomeMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<VariableIncome | null>(null);

  const totals = useMemo(() => {
    const estimated = incomes.reduce((sum, income) => sum + income.estimatedAmount, 0);
    const actual = incomes.reduce(
      (sum, income) => sum + (income.actualAmount ?? income.estimatedAmount),
      0,
    );
    const receivedCount = incomes.filter((income) => income.isReceived).length;
    return { estimated, actual, receivedCount, totalCount: incomes.length };
  }, [incomes]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (income: VariableIncome) => {
    setEditing(income);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const buildPayload = (values: VariableIncomeFormValues) => {
    const actualRaw = values.actualAmount;
    const actualAmount =
      actualRaw === '' || actualRaw === undefined ? undefined : Number(actualRaw);

    return {
      categoryId: Number(values.categoryId),
      title: values.title,
      estimatedAmount: values.estimatedAmount,
      actualAmount: values.isReceived ? actualAmount ?? values.estimatedAmount : undefined,
      description: values.description || undefined,
      month: monthKey,
      isReceived: values.isReceived,
      tags: parseTagsInput(values.tags ?? ''),
    };
  };

  const handleSubmit = async (values: VariableIncomeFormValues) => {
    const body = buildPayload(values);
    if (editing) {
      await updateIncome({ id: editing.id, body }).unwrap();
    } else {
      await createIncome(body).unwrap();
    }
    closeModal();
  };

  const handleDelete = async (income: VariableIncome) => {
    if (!window.confirm(`Excluir "${income.title}"?`)) return;
    await deleteIncome(income.id).unwrap();
  };

  const handleMarkReceived = async (income: VariableIncome) => {
    await updateIncome({
      id: income.id,
      body: {
        isReceived: true,
        actualAmount: income.actualAmount ?? income.estimatedAmount,
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
            <h1 className={styles.title}>Receitas Variáveis</h1>
            <p className={styles.subtitle}>
              Entradas que mudam de valor a cada mês
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
          <p className={styles.error}>Não foi possível carregar as receitas variáveis.</p>
        ) : categories.length === 0 ? (
          <p className={styles.empty}>
            Cadastre categorias de receita antes de criar lançamentos.
          </p>
        ) : (
          <>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Total estimado</p>
                <p className={`${styles.summaryValue} ${styles.summaryValueIncome}`}>
                  {formatCurrency(totals.estimated)}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Total efetivo</p>
                <p className={`${styles.summaryValue} ${styles.summaryValueIncome}`}>
                  {formatCurrency(totals.actual)}
                </p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Recebidas</p>
                <p className={styles.summaryValue}>
                  {totals.receivedCount} de {totals.totalCount}
                </p>
              </div>
            </div>

            <DashboardPanel title="Receitas do mês">
              <VariableIncomeList
                incomes={incomes}
                categoryMap={categoryMap}
                onEdit={openEdit}
                onDelete={handleDelete}
                onMarkReceived={handleMarkReceived}
              />
            </DashboardPanel>
          </>
        )}

        {modalOpen && (
          <IncomeModal
            title={editing ? 'Editar receita variável' : 'Nova receita variável'}
            subtitle="Informe os dados da entrada deste mês."
            onClose={closeModal}
          >
            <VariableIncomeForm
              key={editing?.id ?? monthKey}
              categories={categories}
              monthKey={monthKey}
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
