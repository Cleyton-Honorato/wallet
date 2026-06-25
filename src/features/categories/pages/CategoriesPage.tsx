import { useState } from 'react';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { PageContainer } from '@shared/components/layout';
import { Button } from '@shared/components/ui/Button';
import { cn } from '@shared/utils/cn';
import { useGetCategoriesQuery, useDeleteCategoryMutation } from '../api/categoriesApi';
import { CategoryDialog } from '../components/CategoryDialog';
import type { Category, CategoryType } from '../types/category.types';
import styles from './CategoriesPage.module.css';

function CategoryIcon({ icon, color }: { icon?: string; color: string }) {
  const IconComponent =
    (icon ? (Icons[icon as keyof typeof Icons] as LucideIcon) : null) ?? Icons.Tag;
  return <IconComponent size={22} color={color} />;
}

interface CategoryCardProps {
  category: Category;
  onEdit: () => void;
  onDelete: () => void;
}

function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const badgeClass = category.type === 'income' ? styles.badgeIncome : styles.badgeExpense;
  const badgeLabel = category.type === 'income' ? 'Receita' : 'Despesa';

  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryCardHeader}>
        <div className={styles.categoryCardLeft}>
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: `${category.color}22` }}
          >
            <CategoryIcon icon={category.icon} color={category.color} />
          </div>
          <div className={styles.categoryMeta}>
            <span className={styles.categoryName}>{category.name}</span>
            <span className={cn(styles.badge, badgeClass)}>{badgeLabel}</span>
          </div>
        </div>

        {!category.isSystem && (
          <div className={styles.categoryActions}>
            <button className={styles.actionBtn} title="Editar" onClick={onEdit}>
              <Pencil size={14} />
            </button>
            <button
              className={cn(styles.actionBtn, styles.actionBtnDanger)}
              title="Excluir"
              onClick={onDelete}
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.categoryAccent} style={{ backgroundColor: category.color }} />
    </div>
  );
}

export default function CategoriesPage() {
  const { data: categories = [], isLoading, error } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [activeTab, setActiveTab] = useState<CategoryType>('expense');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const incomeCategories = categories.filter((c) => c.type === 'income');
  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const visibleCategories = activeTab === 'income' ? incomeCategories : expenseCategories;

  const openCreate = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setDialogOpen(true);
  };

  const handleDelete = async (cat: Category) => {
    if (!window.confirm(`Excluir "${cat.name}"?`)) return;
    await deleteCategory(cat.id).unwrap();
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
  };

  return (
    <PageContainer>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Categorias</h1>
            <p className={styles.subtitle}>Gerencie suas categorias de receitas e despesas</p>
          </div>
          <Button variant="primary" icon={<Plus size={16} />} onClick={openCreate}>
            Nova categoria
          </Button>
        </div>

        {isLoading ? (
          <p className={styles.state}>Carregando…</p>
        ) : error ? (
          <p className={styles.error}>Não foi possível carregar as categorias.</p>
        ) : (
          <>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Receitas</p>
                <p className={cn(styles.summaryValue, styles.summaryValueIncome)}>
                  {incomeCategories.length}
                </p>
                <p className={styles.summaryLabel}>categorias de receita</p>
              </div>
              <div className={styles.summaryCard}>
                <p className={styles.summaryLabel}>Despesas</p>
                <p className={cn(styles.summaryValue, styles.summaryValueExpense)}>
                  {expenseCategories.length}
                </p>
                <p className={styles.summaryLabel}>categorias de despesa</p>
              </div>
            </div>

            <div className={styles.tabs}>
              <div className={styles.tabList} role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'income'}
                  className={cn(
                    styles.tabTrigger,
                    activeTab === 'income' && styles.tabTriggerActive,
                  )}
                  onClick={() => setActiveTab('income')}
                >
                  <span className={styles.tabDot} style={{ backgroundColor: '#16a34a' }} />
                  Receitas ({incomeCategories.length})
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'expense'}
                  className={cn(
                    styles.tabTrigger,
                    activeTab === 'expense' && styles.tabTriggerActive,
                  )}
                  onClick={() => setActiveTab('expense')}
                >
                  <span className={styles.tabDot} style={{ backgroundColor: '#dc2626' }} />
                  Despesas ({expenseCategories.length})
                </button>
              </div>

              {visibleCategories.length === 0 ? (
                <p className={styles.empty}>
                  Nenhuma categoria de{' '}
                  {activeTab === 'income' ? 'receita' : 'despesa'} cadastrada.
                </p>
              ) : (
                <div className={styles.categoryGrid}>
                  {visibleCategories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      onEdit={() => openEdit(category)}
                      onDelete={() => handleDelete(category)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <CategoryDialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        editing={editingCategory}
        defaultType={activeTab}
      />
    </PageContainer>
  );
}
