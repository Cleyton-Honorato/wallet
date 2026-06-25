import { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@shared/components/ui/Input';
import { cn } from '@/lib/utils';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../api/categoriesApi';
import type { Category, CategoryType } from '../types/category.types';
import styles from './CategoryDialog.module.css';

const AVAILABLE_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
  '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
  '#EC4899', '#F43F5E', '#64748B', '#6B7280', '#374151',
];

const AVAILABLE_ICONS: Record<CategoryType, string[]> = {
  income: [
    'Briefcase', 'Laptop', 'TrendingUp', 'ShoppingBag', 'DollarSign',
    'PiggyBank', 'Gift', 'Award', 'Star', 'Circle',
  ],
  expense: [
    'CreditCard', 'Wallet', 'Receipt', 'UtensilsCrossed', 'Car',
    'Home', 'Heart', 'GraduationCap', 'Gamepad2', 'ShoppingCart',
    'Plane', 'Shirt', 'Fuel', 'Phone', 'Zap',
    'Wifi', 'Building', 'Users', 'PawPrint', 'Wrench',
  ],
};

function resolveIcon(name: string): LucideIcon {
  return (Icons[name as keyof typeof Icons] as LucideIcon) ?? Icons.Tag;
}

interface FormState {
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
}

function buildInitialState(defaultType: CategoryType, editing?: Category | null): FormState {
  if (editing) {
    return {
      name: editing.name,
      type: editing.type,
      icon: editing.icon ?? AVAILABLE_ICONS[editing.type][0],
      color: editing.color,
    };
  }
  return {
    name: '',
    type: defaultType,
    icon: AVAILABLE_ICONS[defaultType][0],
    color: AVAILABLE_COLORS[0],
  };
}

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editing?: Category | null;
  defaultType?: CategoryType;
}

export function CategoryDialog({
  isOpen,
  onClose,
  editing = null,
  defaultType = 'expense',
}: CategoryDialogProps) {
  const [createCategory, createState] = useCreateCategoryMutation();
  const [updateCategory, updateState] = useUpdateCategoryMutation();

  const [form, setForm] = useState<FormState>(() =>
    buildInitialState(defaultType, editing),
  );

  useEffect(() => {
    if (isOpen) {
      setForm(buildInitialState(defaultType, editing));
    }
  }, [isOpen, editing, defaultType]);

  const handleTypeChange = (type: CategoryType) => {
    setForm((prev) => ({ ...prev, type, icon: AVAILABLE_ICONS[type][0] }));
  };

  const mutationError = createState.error ?? updateState.error;
  const isSubmitting = createState.isLoading || updateState.isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const body = {
      name: form.name.trim(),
      color: form.color,
      icon: form.icon,
      type: (form.type === 'income' ? 'INCOME' : 'EXPENSE') as 'INCOME' | 'EXPENSE',
    };

    try {
      if (editing) {
        await updateCategory({ id: editing.id, body }).unwrap();
      } else {
        await createCategory(body).unwrap();
      }
      onClose();
    } catch {
      // error shown via mutationError
    }
  };

  const icons = AVAILABLE_ICONS[form.type];
  const PreviewIcon = resolveIcon(form.icon);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] flex flex-col max-h-[60vh] p-0 overflow-hidden">
        {/* Header fixo — não acompanha o scroll */}
        <DialogHeader className={styles.header}>
          <DialogTitle>
            {editing ? 'Editar categoria' : 'Nova categoria'}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? 'Edite as informações da categoria.'
              : 'Crie uma nova categoria para organizar suas transações.'}
          </DialogDescription>
        </DialogHeader>

        {/* Área scrollável — apenas o form */}
        <form
          id="category-form"
          className={cn(styles.form, "flex-1 overflow-y-auto")}
          onSubmit={handleSubmit}
        >
          {mutationError && (
            <p className={styles.formError}>
              Não foi possível salvar a categoria. Tente novamente.
            </p>
          )}

          {/* Preview */}
          <div className={styles.preview}>
            <div
              className={styles.previewIcon}
              style={{ backgroundColor: `${form.color}22` }}
            >
              <PreviewIcon size={20} color={form.color} />
            </div>
            <span className={styles.previewName}>
              {form.name || 'Nome da categoria'}
            </span>
          </div>

          {/* Nome */}
          <Input
            id="category-name"
            label="Nome"
            placeholder="Ex: Alimentação, Salário…"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
            autoFocus
          />

          {/* Tipo */}
          <div>
            <span className={styles.fieldLabel}>Tipo</span>
            <div className={styles.radioGroup}>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="category-type"
                  value="income"
                  checked={form.type === 'income'}
                  onChange={() => handleTypeChange('income')}
                />
                <span className={styles.radioIncome}>Receita</span>
              </label>
              <label className={styles.radioOption}>
                <input
                  type="radio"
                  name="category-type"
                  value="expense"
                  checked={form.type === 'expense'}
                  onChange={() => handleTypeChange('expense')}
                />
                <span className={styles.radioExpense}>Despesa</span>
              </label>
            </div>
          </div>

          {/* Ícone */}
          <div>
            <span className={styles.fieldLabel}>Ícone</span>
            <div className={styles.iconGrid}>
              {icons.map((iconName) => {
                const IconComp = resolveIcon(iconName);
                const isActive = form.icon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    className={cn(styles.iconBtn, isActive && styles.iconBtnActive)}
                    onClick={() => setForm((prev) => ({ ...prev, icon: iconName }))}
                    title={iconName}
                  >
                    <IconComp size={20} color={isActive ? form.color : undefined} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cor */}
          <div>
            <span className={styles.fieldLabel}>Cor</span>
            <div className={styles.colorGrid}>
              {AVAILABLE_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    styles.colorCircle,
                    form.color === color && styles.colorCircleActive,
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setForm((prev) => ({ ...prev, color }))}
                  title={color}
                />
              ))}
            </div>
          </div>
        </form>

        {/* Footer fixo — não acompanha o scroll */}
        <DialogFooter className={styles.footer}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="category-form" disabled={isSubmitting}>
            {isSubmitting
              ? 'Salvando…'
              : editing
              ? 'Salvar alterações'
              : 'Criar categoria'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
