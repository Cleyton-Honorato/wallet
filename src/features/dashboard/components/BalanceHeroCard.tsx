import { Shield } from 'lucide-react';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { ProgressBar } from '@shared/components/ui/ProgressBar';
import type { DashboardSummary } from '@features/dashboard/types/dashboard.types';
import styles from './BalanceHeroCard.module.css';
import { cn } from '@shared/utils/cn';

interface BalanceHeroCardProps {
  balance: number;
  periodLabel: string;
  emergencyFund: DashboardSummary['emergencyFund'];
  onManageReserve?: () => void;
}

/** Hero card: prominent monthly balance plus the emergency-fund progress. */
export function BalanceHeroCard({
  balance,
  periodLabel,
  emergencyFund,
  onManageReserve,
}: BalanceHeroCardProps) {
  const { balance: reserveBalance, targetAmount } = emergencyFund;

  return (
    <section className={styles.hero} aria-label="Saldo do mês">
      <div className={styles.top}>
        <span className={styles.label}>Saldo do mês</span>
        <span className={styles.tag}>{periodLabel}</span>
      </div>

      <div className={cn(styles.value, balance < 0 && styles.negative)}>
        {formatCurrency(balance)}
      </div>

      <div className={styles.divider} />

      <button
        type="button"
        className={styles.reserve}
        onClick={onManageReserve}
        aria-label="Gerenciar reserva de emergência"
      >
        <div className={styles.reserveHead}>
          <span className={styles.reserveLabel}>
            <span className={styles.reserveIcon}>
              <Shield size={16} />
            </span>
            Reserva de emergência
          </span>
          <span className={styles.reserveValue}>{formatCurrency(reserveBalance)}</span>
        </div>
        <ProgressBar value={reserveBalance} max={targetAmount} />
        <div className={styles.reserveFoot}>
          <span>Meta</span>
          <span className={styles.reserveGoal}>{formatCurrency(targetAmount)}</span>
        </div>
      </button>
    </section>
  );
}
