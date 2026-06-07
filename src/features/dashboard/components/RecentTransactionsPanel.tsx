import { Receipt } from 'lucide-react';
import { Button } from '@shared/components/ui/Button';
import { DashboardPanel } from './DashboardPanel';
import styles from './RecentTransactionsPanel.module.css';

interface RecentTransactionsPanelProps {
  onViewAll?: () => void;
  onNewTransaction?: () => void;
}

/**
 * Recent transactions panel.
 * The dashboard summary doesn't yet expose a transactions feed, so this renders
 * a designed empty state until that data source is wired up.
 */
export function RecentTransactionsPanel({
  onViewAll,
  onNewTransaction,
}: RecentTransactionsPanelProps) {
  return (
    <DashboardPanel
      title="Transações recentes"
      action={
        <Button variant="ghost" size="sm" onClick={onViewAll}>
          Ver todas
        </Button>
      }
    >
      <div className={styles.empty}>
        <span className={styles.iconCircle}>
          <Receipt size={24} />
        </span>
        <p className={styles.title}>Sem lançamentos recentes</p>
        <p className={styles.text}>
          As últimas receitas e despesas do período aparecerão aqui assim que forem registradas.
        </p>
        <Button variant="secondary" size="sm" onClick={onNewTransaction}>
          Nova transação
        </Button>
      </div>
    </DashboardPanel>
  );
}
