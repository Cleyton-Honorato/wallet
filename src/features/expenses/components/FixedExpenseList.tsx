import { Check, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { Category } from '@features/categories/types/category.types';
import type { FixedExpense } from '../types/expense.types';
import { formatDueDay, formatPeriodRange } from '../lib/formatters';
import { CategoryBadge } from './CategoryBadge';
import styles from './Expenses.module.css';

interface FixedExpenseListProps {
  expenses: FixedExpense[];
  categoryMap: Map<string, Category>;
  onEdit: (expense: FixedExpense) => void;
  onDelete: (expense: FixedExpense) => void;
  onToggleActive: (expense: FixedExpense) => void;
  onTogglePaid: (expense: FixedExpense) => void;
}

export function FixedExpenseList({
  expenses,
  categoryMap,
  onEdit,
  onDelete,
  onToggleActive,
  onTogglePaid,
}: FixedExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhuma despesa fixa cadastrada. Clique em &quot;Nova despesa&quot; para começar.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {expenses.map((expense) => (
        <article
          key={expense.id}
          className={`${styles.row} ${!expense.isActive ? styles.rowInactive : ''}`}
        >
          <div className={styles.rowMain}>
            <span className={styles.rowTitle}>{expense.title}</span>
            <div className={styles.rowMeta}>
              <CategoryBadge category={categoryMap.get(expense.categoryId)} />
              <span>{formatDueDay(expense.dueDay)}</span>
              <span>{formatPeriodRange(expense.startDate, expense.endDate)}</span>
              <span className={expense.isActive ? styles.statusActive : styles.statusInactive}>
                {expense.isActive ? 'Ativa' : 'Inativa'}
              </span>
              <span className={expense.paid ? styles.statusPaid : styles.statusPending}>
                {expense.paid ? 'Paga no mês' : 'Pendente'}
              </span>
            </div>
            {expense.description && (
              <span className={styles.rowMeta}>{expense.description}</span>
            )}
          </div>

          <div className={styles.rowAmounts}>
            <span className={styles.amount}>{formatCurrency(expense.amount)}</span>
            <span className={styles.amountMuted}>por mês</span>
          </div>

          <div className={styles.rowActions}>
            <Button
              variant={expense.paid ? 'ghost' : 'primary'}
              size="sm"
              onClick={() => onTogglePaid(expense)}
            >
              {expense.paid ? 'Desfazer' : (<><Check size={16} /> Pagar</>)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleActive(expense)}
            >
              {expense.isActive ? 'Desativar' : 'Ativar'}
            </Button>
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
