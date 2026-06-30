import { useEffect, type ReactNode } from 'react';
import styles from './Incomes.module.css';

interface IncomeModalProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}

export function IncomeModal({ title, subtitle, onClose, children }: IncomeModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="income-modal-title"
      >
        <h3 id="income-modal-title" className={styles.modalTitle}>
          {title}
        </h3>
        <p className={styles.modalSubtitle}>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
