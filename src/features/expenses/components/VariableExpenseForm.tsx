import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { getErrorMessage } from '@features/auth/lib/getErrorMessage';
import type { Category } from '@features/categories/types/category.types';
import type { VariableExpense } from '../types/expense.types';
import { formatTags, parseTagsInput } from '../lib/formatters';
import styles from './Expenses.module.css';

const schema = z.object({
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  title: z.string().min(1, 'Informe o título').max(120),
  estimatedAmount: z.coerce.number().positive('Informe um valor positivo'),
  actualAmount: z.coerce.number().positive('Informe um valor positivo').optional().or(z.literal('')),
  description: z.string().optional(),
  tags: z.string().optional(),
  isPaid: z.boolean(),
});

type VariableExpenseFormValues = z.infer<typeof schema>;

interface VariableExpenseFormProps {
  categories: Category[];
  monthKey: string;
  initial?: VariableExpense;
  error: unknown;
  isSubmitting: boolean;
  onSubmit: (values: VariableExpenseFormValues) => Promise<void>;
  onCancel: () => void;
}

export function VariableExpenseForm({
  categories,
  monthKey,
  initial,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
}: VariableExpenseFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VariableExpenseFormValues>({
    resolver: zodResolver(schema) as Resolver<VariableExpenseFormValues>,
    defaultValues: {
      categoryId: initial?.categoryId ?? categories[0]?.id ?? '',
      title: initial?.title ?? '',
      estimatedAmount: initial?.estimatedAmount ?? 0,
      actualAmount: initial?.actualAmount ?? '',
      description: initial?.description ?? '',
      tags: formatTags(initial?.tags),
      isPaid: initial?.isPaid ?? false,
    },
  });

  const isPaid = watch('isPaid');
  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {Boolean(error) && (
        <div className={styles.formError}>
          {getErrorMessage(error, 'Não foi possível salvar a despesa')}
        </div>
      )}

      <div className={styles.formGrid}>
        <div className={styles.formGridFull}>
          <Input
            id="variable-title"
            label="Título"
            {...register('title')}
            error={errors.title?.message}
          />
        </div>

        <Select
          id="variable-category"
          label="Categoria"
          options={categoryOptions}
          {...register('categoryId')}
        />

        <div>
          <span className={styles.fieldLabel}>Mês</span>
          <p className={styles.rowMeta} style={{ marginTop: 'var(--space-1)' }}>
            {monthKey}
          </p>
        </div>

        <Input
          id="variable-estimated"
          label="Valor estimado (R$)"
          type="number"
          step="0.01"
          min="0"
          {...register('estimatedAmount')}
          error={errors.estimatedAmount?.message}
        />

        {isPaid && (
          <Input
            id="variable-actual"
            label="Valor pago (R$)"
            type="number"
            step="0.01"
            min="0"
            {...register('actualAmount')}
            error={errors.actualAmount?.message}
          />
        )}

        <div className={styles.formGridFull}>
          <Input
            id="variable-tags"
            label="Tags (separadas por vírgula)"
            placeholder="mercado, casa"
            {...register('tags')}
          />
        </div>

        <div className={styles.formGridFull}>
          <label className={styles.fieldLabel} htmlFor="variable-description">
            Descrição (opcional)
          </label>
          <textarea
            id="variable-description"
            className={styles.textarea}
            {...register('description')}
          />
        </div>

        <div className={styles.formGridFull}>
          <label className={styles.checkboxRow}>
            <input type="checkbox" {...register('isPaid')} />
            Marcar como paga
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <Button variant="ghost" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando…' : initial ? 'Salvar alterações' : 'Criar despesa'}
        </Button>
      </div>
    </form>
  );
}

export type { VariableExpenseFormValues };
export { parseTagsInput };
