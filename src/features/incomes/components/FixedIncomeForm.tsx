import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { getErrorMessage } from '@features/auth/lib/getErrorMessage';
import type { Category } from '@features/categories/types/category.types';
import type { FixedIncome } from '../types/income.types';
import styles from './Incomes.module.css';

const schema = z.object({
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  title: z.string().min(1, 'Informe o título').max(120),
  amount: z.coerce.number().positive('Informe um valor positivo'),
  receiptDay: z.coerce.number().int().min(1).max(31),
  startDate: z.string().min(1, 'Informe a data de início'),
  endDate: z.string().optional(),
  description: z.string().optional(),
  isActive: z.boolean(),
});

type FixedIncomeFormValues = z.infer<typeof schema>;

interface FixedIncomeFormProps {
  categories: Category[];
  initial?: FixedIncome;
  error: unknown;
  isSubmitting: boolean;
  onSubmit: (values: FixedIncomeFormValues) => Promise<void>;
  onCancel: () => void;
}

export function FixedIncomeForm({
  categories,
  initial,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
}: FixedIncomeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FixedIncomeFormValues>({
    resolver: zodResolver(schema) as Resolver<FixedIncomeFormValues>,
    defaultValues: {
      categoryId: initial?.categoryId ?? categories[0]?.id ?? '',
      title: initial?.title ?? '',
      amount: initial?.amount ?? 0,
      receiptDay: initial?.receiptDay ?? 1,
      startDate: initial?.startDate ?? new Date().toISOString().slice(0, 10),
      endDate: initial?.endDate ?? '',
      description: initial?.description ?? '',
      isActive: initial?.isActive ?? true,
    },
  });

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {Boolean(error) && (
        <div className={styles.formError}>
          {getErrorMessage(error, 'Não foi possível salvar a receita')}
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.formGridFull}>
          <Input
            id="fixed-income-title"
            label="Título"
            {...register('title')}
            error={errors.title?.message}
          />
        </div>

        <Select
          id="fixed-income-category"
          label="Categoria"
          options={categoryOptions}
          {...register('categoryId')}
        />

        <Input
          id="fixed-income-amount"
          label="Valor (R$)"
          type="number"
          step="0.01"
          min="0"
          {...register('amount')}
          error={errors.amount?.message}
        />

        <Input
          id="fixed-income-receipt-day"
          label="Dia de recebimento"
          type="number"
          min="1"
          max="31"
          {...register('receiptDay')}
          error={errors.receiptDay?.message}
        />

        <Input
          id="fixed-income-start-date"
          label="Início"
          type="date"
          {...register('startDate')}
          error={errors.startDate?.message}
        />

        <Input
          id="fixed-income-end-date"
          label="Término (opcional)"
          type="date"
          {...register('endDate')}
        />

        <div className={styles.formGridFull}>
          <label className={styles.fieldLabel} htmlFor="fixed-income-description">
            Descrição (opcional)
          </label>
          <textarea
            id="fixed-income-description"
            className={styles.textarea}
            {...register('description')}
          />
        </div>

        <div className={styles.formGridFull}>
          <label className={styles.checkboxRow}>
            <input type="checkbox" {...register('isActive')} />
            Receita ativa
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando…' : initial ? 'Salvar alterações' : 'Criar receita'}
        </Button>
      </div>
    </form>
  );
}

export type { FixedIncomeFormValues };
