import { Check, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { Category } from '@features/categories/types/category.types';
import type { VariableIncome } from '../types/income.types';
import { CategoryBadge } from './CategoryBadge';
import styles from './Incomes.module.css';

interface VariableIncomeListProps {
  incomes: VariableIncome[];
  categoryMap: Map<string, Category>;
  onEdit: (income: VariableIncome) => void;
  onDelete: (income: VariableIncome) => void;
  onMarkReceived: (income: VariableIncome) => void;
}

export function VariableIncomeList({
  incomes,
  categoryMap,
  onEdit,
  onDelete,
  onMarkReceived,
}: VariableIncomeListProps) {
  if (incomes.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhuma receita variável neste mês. Clique em &quot;Nova receita&quot; para adicionar.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {incomes.map((income) => (
        <article key={income.id} className={styles.row}>
          <div className={styles.rowMain}>
            <span className={styles.rowTitle}>{income.title}</span>
            <div className={styles.rowMeta}>
              <CategoryBadge category={categoryMap.get(income.categoryId)} />
              <span className={income.isReceived ? styles.statusPaid : styles.statusPending}>
                {income.isReceived ? 'Recebida' : 'Pendente'}
              </span>
            </div>
            {income.tags && income.tags.length > 0 && (
              <div className={styles.tagList}>
                {income.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {income.description && (
              <span className={styles.rowMeta}>{income.description}</span>
            )}
          </div>

          <div className={styles.rowAmounts}>
            <span className={styles.amount}>
              {formatCurrency(income.actualAmount ?? income.estimatedAmount)}
            </span>
            <span className={styles.amountMuted}>
              estimado {formatCurrency(income.estimatedAmount)}
            </span>
          </div>

          <div className={styles.rowActions}>
            {!income.isReceived && (
              <Button variant="ghost" size="sm" onClick={() => onMarkReceived(income)}>
                <Check size={16} />
                Receber
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onEdit(income)}>
              <Pencil size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(income)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
