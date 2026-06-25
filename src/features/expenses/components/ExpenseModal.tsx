import { useEffect, type ReactNode } from 'react';
import styles from './Expenses.module.css';

interface ExpenseModalProps {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: ReactNode;
}

export function ExpenseModal({ title, subtitle, onClose, children }: ExpenseModalProps) {
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
        aria-labelledby="expense-modal-title"
      >
        <h3 id="expense-modal-title" className={styles.modalTitle}>
          {title}
        </h3>
        <p className={styles.modalSubtitle}>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
