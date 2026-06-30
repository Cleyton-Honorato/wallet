import { Check, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { formatCurrency } from '@shared/utils/formatCurrency';
import type { Category } from '@features/categories/types/category.types';
import type { FixedIncome } from '../types/income.types';
import { formatReceiptDay, formatPeriodRange } from '../lib/formatters';
import { CategoryBadge } from './CategoryBadge';
import styles from './Incomes.module.css';

interface FixedIncomeListProps {
  incomes: FixedIncome[];
  categoryMap: Map<string, Category>;
  onEdit: (income: FixedIncome) => void;
  onDelete: (income: FixedIncome) => void;
  onToggleActive: (income: FixedIncome) => void;
  onToggleReceived: (income: FixedIncome) => void;
}

export function FixedIncomeList({
  incomes,
  categoryMap,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleReceived,
}: FixedIncomeListProps) {
  if (incomes.length === 0) {
    return (
      <p className={styles.empty}>
        Nenhuma receita fixa cadastrada. Clique em &quot;Nova receita&quot; para começar.
      </p>
    );
  }

  return (
    <div className={styles.list}>
      {incomes.map((income) => (
        <article
          key={income.id}
          className={`${styles.row} ${!income.isActive ? styles.rowInactive : ''}`}
        >
          <div className={styles.rowMain}>
            <span className={styles.rowTitle}>{income.title}</span>
            <div className={styles.rowMeta}>
              <CategoryBadge category={categoryMap.get(income.categoryId)} />
              <span>{formatReceiptDay(income.receiptDay)}</span>
              <span>{formatPeriodRange(income.startDate, income.endDate)}</span>
              <span className={income.isActive ? styles.statusActive : styles.statusInactive}>
                {income.isActive ? 'Ativa' : 'Inativa'}
              </span>
              <span className={income.received ? styles.statusPaid : styles.statusPending}>
                {income.received ? 'Recebida no mês' : 'Pendente'}
              </span>
            </div>
            {income.description && (
              <span className={styles.rowMeta}>{income.description}</span>
            )}
          </div>

          <div className={styles.rowAmounts}>
            <span className={styles.amount}>{formatCurrency(income.amount)}</span>
            <span className={styles.amountMuted}>por mês</span>
          </div>

          <div className={styles.rowActions}>
            <Button
              variant={income.received ? 'ghost' : 'primary'}
              size="sm"
              onClick={() => onToggleReceived(income)}
            >
              {income.received ? 'Desfazer' : (<><Check size={16} /> Receber</>)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleActive(income)}
            >
              {income.isActive ? 'Desativar' : 'Ativar'}
            </Button>
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
