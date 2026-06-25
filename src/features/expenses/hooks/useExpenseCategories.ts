import { useMemo } from 'react';
import { useGetCategoriesQuery } from '@features/categories/api/categoriesApi';
import type { Category } from '@features/categories/types/category.types';

export function useExpenseCategories(): {
  categories: Category[];
  categoryMap: Map<string, Category>;
  isLoading: boolean;
} {
  const { data = [], isLoading } = useGetCategoriesQuery();

  const categories = useMemo(
    () => data.filter((category) => category.type === 'expense'),
    [data],
  );

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  return { categories, categoryMap, isLoading };
}
