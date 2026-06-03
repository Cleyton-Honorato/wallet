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
  fixedExpenses: import('@features/transactions/types/expense.types').FixedExpense[];
  variableExpenses: import('@features/transactions/types/expense.types').VariableExpense[];
  emergencyFundSnapshot: import('@features/emergency-fund/types/emergencyFund.types').EmergencyFundSnapshot;
  emergencyFundMovements: import('@features/emergency-fund/types/emergencyFund.types').EmergencyFundMovement[];
  investmentPositions: import('@features/investments/types/investment.types').InvestmentPosition[];
  investmentMovements: import('@features/investments/types/investment.types').InvestmentMovement[];
  monthlyBudgets: MonthlyBudget[];
}
