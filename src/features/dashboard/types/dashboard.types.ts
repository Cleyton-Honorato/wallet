import type { MonthlyBudget } from '@features/budgets/types/budget.types';

export interface DashboardPeriod {
  year: number;
  month?: number;
}

export interface IncomeBreakdown {
  fixed: number;
  variable: number;
  total: number;
}

export interface ExpenseBreakdown {
  fixed: number;
  variable: number;
  total: number;
}

export interface CategoryExpenseSlice {
  categoryId: string;
  categoryName: string;
  color: string;
  amount: number;
  percentage: number;
}

export type MatrixSectionKind = 'expense' | 'income';

export type MatrixRowType =
  | 'fixedExpense'
  | 'variableExpenseCategory'
  | 'fixedIncome'
  | 'variableIncomeCategory';

export type MatrixCellStatus = 'none' | 'pending' | 'partial' | 'paid';

export interface MatrixRow {
  id: string;
  label: string;
  /** Valores de Janeiro (0) a Dezembro (11). */
  values: number[];
  /** Status de quitação por mês (Janeiro=0 … Dezembro=11). */
  statuses: MatrixCellStatus[];
  rowType: MatrixRowType;
  /** id da despesa/receita fixa, ou da categoria (variáveis). */
  refId: number;
}

export interface MatrixSection {
  key: string;
  title: string;
  kind: MatrixSectionKind;
  rows: MatrixRow[];
}

export interface DashboardMatrix {
  year: number;
  sections: MatrixSection[];
  totals: {
    expenses: number[];
    income: number[];
    leftover: number[];
  };
}

export interface MonthlyBudgetView {
  month: string;
  monthLabel: string;
  budget: MonthlyBudget | null;
  totalPlanned: number;
  totalSpent: number;
  totalRemaining: number;
  usagePercent: number;
  lines: Array<{
    categoryId: string;
    categoryName: string;
    color: string;
    plannedAmount: number;
    spentAmount: number;
    remaining: number;
    usagePercent: number;
  }>;
}

export interface DashboardSummary {
  period: DashboardPeriod;
  periodLabel: string;
  income: IncomeBreakdown;
  expenses: ExpenseBreakdown;
  balance: number;
  emergencyFund: {
    balance: number;
    targetAmount: number;
    periodMovements: number;
  };
  investments: {
    totalValue: number;
    periodMovements: number;
  };
  expensesByCategory: CategoryExpenseSlice[];
  monthlyBudget: MonthlyBudgetView;
}

export interface DashboardFixtures {
  categories: import('@features/categories/types/category.types').Category[];
  fixedIncomes: import('@features/transactions/types/income.types').FixedIncome[];
  variableIncomes: import('@features/transactions/types/income.types').VariableIncome[];
  fixedExpenses: import('@features/expenses/types/expense.types').FixedExpense[];
  variableExpenses: import('@features/expenses/types/expense.types').VariableExpense[];
  emergencyFundSnapshot: import('@features/emergency-fund/types/emergencyFund.types').EmergencyFundSnapshot;
  emergencyFundMovements: import('@features/emergency-fund/types/emergencyFund.types').EmergencyFundMovement[];
  investmentPositions: import('@features/investments/types/investment.types').InvestmentPosition[];
  investmentMovements: import('@features/investments/types/investment.types').InvestmentMovement[];
  monthlyBudgets: MonthlyBudget[];
}
