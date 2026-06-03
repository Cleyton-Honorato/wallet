export interface BudgetCategoryLine {
  categoryId: string;
  plannedAmount: number;
  spentAmount: number;
}

export interface MonthlyBudget {
  id: string;
  month: string;
  totalPlanned: number;
  lines: BudgetCategoryLine[];
  createdAt: string;
  updatedAt: string;
}
