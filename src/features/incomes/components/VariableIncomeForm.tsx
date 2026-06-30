import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { getErrorMessage } from '@features/auth/lib/getErrorMessage';
import type { Category } from '@features/categories/types/category.types';
import type { VariableIncome } from '../types/income.types';
import { formatTags, parseTagsInput } from '../lib/formatters';
import styles from './Incomes.module.css';

const schema = z.object({
  categoryId: z.string().min(1, 'Selecione uma categoria'),
  title: z.string().min(1, 'Informe o título').max(120),
  estimatedAmount: z.coerce.number().positive('Informe um valor positivo'),
  actualAmount: z.coerce.number().positive('Informe um valor positivo').optional().or(z.literal('')),
  description: z.string().optional(),
  tags: z.string().optional(),
  isReceived: z.boolean(),
});

type VariableIncomeFormValues = z.infer<typeof schema>;

interface VariableIncomeFormProps {
  categories: Category[];
  monthKey: string;
  initial?: VariableIncome;
  error: unknown;
  isSubmitting: boolean;
  onSubmit: (values: VariableIncomeFormValues) => Promise<void>;
  onCancel: () => void;
}

export function VariableIncomeForm({
  categories,
  monthKey,
  initial,
  error,
  isSubmitting,
  onSubmit,
  onCancel,
}: VariableIncomeFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VariableIncomeFormValues>({
    resolver: zodResolver(schema) as Resolver<VariableIncomeFormValues>,
    defaultValues: {
      categoryId: initial?.categoryId ?? categories[0]?.id ?? '',
      title: initial?.title ?? '',
      estimatedAmount: initial?.estimatedAmount ?? 0,
      actualAmount: initial?.actualAmount ?? '',
      description: initial?.description ?? '',
      tags: formatTags(initial?.tags),
      isReceived: initial?.isReceived ?? false,
    },
  });

  const isReceived = watch('isReceived');
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
            id="variable-income-title"
            label="Título"
            {...register('title')}
            error={errors.title?.message}
          />
        </div>

        <Select
          id="variable-income-category"
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
          id="variable-income-estimated"
          label="Valor estimado (R$)"
          type="number"
          step="0.01"
          min="0"
          {...register('estimatedAmount')}
          error={errors.estimatedAmount?.message}
        />

        {isReceived && (
          <Input
            id="variable-income-actual"
            label="Valor recebido (R$)"
            type="number"
            step="0.01"
            min="0"
            {...register('actualAmount')}
            error={errors.actualAmount?.message}
          />
        )}

        <div className={styles.formGridFull}>
          <Input
            id="variable-income-tags"
            label="Tags (separadas por vírgula)"
            placeholder="freelance, bônus"
            {...register('tags')}
          />
        </div>

        <div className={styles.formGridFull}>
          <label className={styles.fieldLabel} htmlFor="variable-income-description">
            Descrição (opcional)
          </label>
          <textarea
            id="variable-income-description"
            className={styles.textarea}
            {...register('description')}
          />
        </div>

        <div className={styles.formGridFull}>
          <label className={styles.checkboxRow}>
            <input type="checkbox" {...register('isReceived')} />
            Marcar como recebida
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

export type { VariableIncomeFormValues };
export { parseTagsInput };
