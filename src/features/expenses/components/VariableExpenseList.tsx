import { Check, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { Category } from '@features/categories/types/category.types';
import type { VariableExpense } from '../types/expense.types';
import { CategoryBadge } from './CategoryBadge';
import styles from './Expenses.module.css';

interface VariableExpenseListProps {
  expenses: VariableExpense[];
  categoryMap: Map<string, Category>;
  onEdit: (expense: VariableExpense) => void;
  onDelete: (expense: VariableExpense) => void;
  onMarkPaid: (expense: VariableExpense) => void;
}

export function VariableExpenseList({
  expenses,
  categoryMap,
  onEdit,
  onDelete,
  onMarkPaid,
}: VariableExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhuma despesa variável neste mês. Clique em &quot;Nova despesa&quot; para adicionar.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {expenses.map((expense) => (
        <article key={expense.id} className={styles.row}>
          <div className={styles.rowMain}>
            <span className={styles.rowTitle}>{expense.title}</span>
            <div className={styles.rowMeta}>
              <CategoryBadge category={categoryMap.get(expense.categoryId)} />
              <span className={expense.isPaid ? styles.statusPaid : styles.statusPending}>
                {expense.isPaid ? 'Paga' : 'Pendente'}
              </span>
            </div>
            {expense.tags && expense.tags.length > 0 && (
              <div className={styles.tagList}>
                {expense.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {expense.description && (
              <span className={styles.rowMeta}>{expense.description}</span>
            )}
          </div>

          <div className={styles.rowAmounts}>
            <span className={styles.amount}>
              {formatCurrency(expense.actualAmount ?? expense.estimatedAmount)}
            </span>
            <span className={styles.amountMuted}>
              estimado {formatCurrency(expense.estimatedAmount)}
            </span>
          </div>

          <div className={styles.rowActions}>
            {!expense.isPaid && (
              <Button variant="ghost" size="sm" onClick={() => onMarkPaid(expense)}>
                <Check size={16} />
                Pagar
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => onEdit(expense)}>
              <Pencil size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(expense)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
