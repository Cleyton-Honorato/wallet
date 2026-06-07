import { useEffect, useId, useState, type FormEvent } from 'react';
import { Button } from '@shared/components/ui/Button';
import { Input } from '@shared/components/ui/Input';
import { Select } from '@shared/components/ui/Select';
import styles from './NewTransactionModal.module.css';

interface NewTransactionModalProps {
  categories: string[];
  onClose: () => void;
}

const TYPE_OPTIONS = [
  { value: 'expense', label: 'Despesa' },
  { value: 'income', label: 'Receita' },
];

/**
 * Presentational "Nova transação" modal from the design system.
 * Submitting just closes for now — there is no transaction-create endpoint yet.
 */
export function NewTransactionModal({ categories, onClose }: NewTransactionModalProps) {
  const fieldId = useId();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(categories[0] ?? '');

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

  const categoryOptions = categories.map((name) => ({ value: name, label: name }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${fieldId}-title`}
      >
        <h3 id={`${fieldId}-title`} className={styles.title}>
          Nova transação
        </h3>
        <p className={styles.subtitle}>Registre uma receita ou despesa na sua conta.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <Input
              id={`${fieldId}-desc`}
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex.: Supermercado"
            />
            <Input
              id={`${fieldId}-amount`}
              label="Valor"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="R$ 0,00"
              inputMode="decimal"
            />
            <Select
              id={`${fieldId}-type`}
              label="Tipo"
              options={TYPE_OPTIONS}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            {categoryOptions.length > 0 && (
              <Select
                id={`${fieldId}-category`}
                label="Categoria"
                options={categoryOptions}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            )}
          </div>

          <div className={styles.actions}>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar transação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
