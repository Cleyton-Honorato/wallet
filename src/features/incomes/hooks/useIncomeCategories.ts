import { useMemo } from 'react';
import { useGetCategoriesQuery } from '@features/categories/api/categoriesApi';
import type { Category } from '@features/categories/types/category.types';

export function useIncomeCategories(): {
  categories: Category[];
  categoryMap: Map<string, Category>;
  isLoading: boolean;
} {
  const { data = [], isLoading } = useGetCategoriesQuery();

  const categories = useMemo(
    () => data.filter((category) => category.type === 'income'),
    [data],
  );

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  return { categories, categoryMap, isLoading };
}
