import { useEffect, useId, useState, type FormEvent } from 'react';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import { formatCurrency } from '@shared/utils/formatCurrency';
import { getErrorMessage } from '@features/auth/lib/getErrorMessage';
import {
  useAddEmergencyFundMovementMutation,
  useGetEmergencyFundQuery,
  useUpdateEmergencyFundMutation,
} from '../api/emergencyFundApi';
import type { EmergencyFundMovementType } from '../types/emergencyFund.types';
import styles from './EmergencyFundModal.module.css';

interface EmergencyFundModalProps {
  onClose: () => void;
}

const MOVEMENT_OPTIONS = [
  { value: 'deposit', label: 'Depósito' },
  { value: 'withdrawal', label: 'Resgate' },
];

const today = () => new Date().toISOString().slice(0, 10);

function formatDateLabel(date: string): string {
  const [y, m, d] = date.split('-');
  return `${d}/${m}/${y}`;
}

export function EmergencyFundModal({ onClose }: EmergencyFundModalProps) {
  const fieldId = useId();
  const { data: fund, isLoading } = useGetEmergencyFundQuery();
  const [updateFund, updateState] = useUpdateEmergencyFundMutation();
  const [addMovement, movementState] = useAddEmergencyFundMovementMutation();

  const [targetDraft, setTargetDraft] = useState<string | null>(null);
  const [type, setType] = useState<EmergencyFundMovementType>('deposit');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState('');

  // Valor exibido: rascunho do usuário ou, antes de editar, a meta vinda da API.
  const target = targetDraft ?? (fund ? String(fund.targetAmount) : '');

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

  const handleSaveTarget = async (event: FormEvent) => {
    event.preventDefault();
    const targetAmount = Number(target);
    if (!Number.isFinite(targetAmount) || targetAmount < 0) return;
    await updateFund({ targetAmount }).unwrap();
  };

  const handleAddMovement = async (event: FormEvent) => {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return;
    await addMovement({
      type,
      amount: value,
      date,
      description: description.trim() || undefined,
    }).unwrap();
    setAmount('');
    setDescription('');
  };

  const error = updateState.error ?? movementState.error;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${fieldId}-title`}
      >
        <h3 id={`${fieldId}-title`} className={styles.title}>
          Reserva de emergência
        </h3>
        <p className={styles.subtitle}>
          Defina sua meta e registre depósitos ou resgates.
        </p>

        {Boolean(error) && (
          <div className={styles.formError}>
            {getErrorMessage(error, 'Não foi possível salvar. Tente novamente.')}
          </div>
        )}

        <div className={styles.summary}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Saldo atual</span>
            <span className={styles.summaryValue}>
              {formatCurrency(fund?.balance ?? 0)}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Meta</span>
            <span className={styles.summaryValue}>
              {formatCurrency(fund?.targetAmount ?? 0)}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveTarget}>
          <h4 className={styles.sectionTitle}>Definir meta</h4>
          <div className={styles.fields}>
            <Input
              id={`${fieldId}-target`}
              label="Meta da reserva (R$)"
              type="number"
              step="0.01"
              min="0"
              value={target}
              onChange={(e) => setTargetDraft(e.target.value)}
              placeholder="0,00"
            />
          </div>
          <div className={styles.actions}>
            <Button
              variant="secondary"
              type="submit"
              disabled={isLoading || updateState.isLoading}
            >
              {updateState.isLoading ? 'Salvando…' : 'Salvar meta'}
            </Button>
          </div>
        </form>

        <form onSubmit={handleAddMovement} className={styles.section}>
          <h4 className={styles.sectionTitle}>Nova movimentação</h4>
          <div className={styles.fields}>
            <div className={styles.row}>
              <Select
                id={`${fieldId}-type`}
                label="Tipo"
                options={MOVEMENT_OPTIONS}
                value={type}
                onChange={(e) => setType(e.target.value as EmergencyFundMovementType)}
              />
              <Input
                id={`${fieldId}-amount`}
                label="Valor (R$)"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
              />
            </div>
            <Input
              id={`${fieldId}-date`}
              label="Data"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              id={`${fieldId}-desc`}
              label="Descrição (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex.: Depósito mensal"
            />
          </div>
          <div className={styles.actions}>
            <Button
              variant="primary"
              type="submit"
              disabled={movementState.isLoading}
            >
              {movementState.isLoading ? 'Registrando…' : 'Registrar'}
            </Button>
          </div>
        </form>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Movimentações recentes</h4>
          {fund && fund.movements.length > 0 ? (
            <div className={styles.movements}>
              {fund.movements.slice(0, 8).map((movement) => (
                <div key={movement.id} className={styles.movement}>
                  <div className={styles.movementMain}>
                    <span>{movement.description || (movement.type === 'deposit' ? 'Depósito' : 'Resgate')}</span>
                    <span className={styles.movementDate}>
                      {formatDateLabel(movement.date)}
                    </span>
                  </div>
                  <span
                    className={`${styles.movementAmount} ${
                      movement.type === 'deposit' ? styles.deposit : styles.withdrawal
                    }`}
                  >
                    {movement.type === 'deposit' ? '+' : '−'} {formatCurrency(movement.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Nenhuma movimentação registrada ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
