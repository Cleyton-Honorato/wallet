export type CategoryType = 'expense' | 'income';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  type: CategoryType;
  isSystem?: boolean;
}
