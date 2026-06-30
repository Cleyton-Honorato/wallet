import type { Category } from '@features/categories/types/category.types';
import styles from './Incomes.module.css';

interface CategoryBadgeProps {
  category?: Category;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  if (!category) {
    return <span className={styles.badge}>Sem categoria</span>;
  }

  return (
    <span className={styles.badge}>
      <span
        className={styles.badgeDot}
        style={{ backgroundColor: category.color }}
        aria-hidden
      />
      {category.name}
    </span>
  );
}
