import type { Category } from '@features/categories/types/category.types';
import type { DashboardFixtures, DashboardPeriod, DashboardSummary, CategoryExpenseSlice } from '@features/dashboard/types/dashboard.types';
import { getBudgetUsagePercent, getRemaining } from '@features/budgets/lib/budgetSummary';
import {
  countActiveMonthsInPeriod,
  formatMonthLabel,
  formatPeriodLabel,
  getBudgetMonthKey,
  isDateInPeriod,
  isMonthInPeriod,
} from './periodUtils';

function getCategoryMap(categories: Category[]): Map<string, Category> {
  return new Map(categories.map((c) => [c.id, c]));
}

function sumFixedIncomes(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
): number {
  return fixtures.fixedIncomes
    .filter((item) => item.isActive)
    .reduce((sum, item) => {
      const months = countActiveMonthsInPeriod(item.startDate, item.endDate, period);
      return sum + item.amount * months;
    }, 0);
}

function sumVariableIncomes(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
): number {
  return fixtures.variableIncomes
    .filter((item) => isMonthInPeriod(item.month, period))
    .reduce((sum, item) => sum + (item.actualAmount ?? item.estimatedAmount), 0);
}

function sumFixedExpenses(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
): number {
  return fixtures.fixedExpenses
    .filter((item) => item.isActive)
    .reduce((sum, item) => {
      const months = countActiveMonthsInPeriod(item.startDate, item.endDate, period);
      return sum + item.amount * months;
    }, 0);
}

function sumVariableExpenses(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
): number {
  return fixtures.variableExpenses
    .filter((item) => isMonthInPeriod(item.month, period))
    .reduce((sum, item) => sum + (item.actualAmount ?? item.estimatedAmount), 0);
}

function buildExpensesByCategory(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
  categoryMap: Map<string, Category>,
): CategoryExpenseSlice[] {
  const totals = new Map<string, number>();

  for (const item of fixtures.fixedExpenses) {
    if (!item.isActive) continue;
    const months = countActiveMonthsInPeriod(item.startDate, item.endDate, period);
    const amount = item.amount * months;
    totals.set(item.categoryId, (totals.get(item.categoryId) ?? 0) + amount);
  }

  for (const item of fixtures.variableExpenses) {
    if (!isMonthInPeriod(item.month, period)) continue;
    const amount = item.actualAmount ?? item.estimatedAmount;
    totals.set(item.categoryId, (totals.get(item.categoryId) ?? 0) + amount);
  }

  const grandTotal = Array.from(totals.values()).reduce((s, v) => s + v, 0);

  return Array.from(totals.entries())
    .map(([categoryId, amount]) => {
      const category = categoryMap.get(categoryId);
      return {
        categoryId,
        categoryName: category?.name ?? categoryId,
        color: category?.color ?? '#6b7280',
        amount,
        percentage: grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0,
      };
    })
    .sort((a, b) => b.amount - a.amount);
}

function sumEmergencyMovements(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
): number {
  return fixtures.emergencyFundMovements
    .filter((m) => isDateInPeriod(m.date, period))
    .reduce((sum, m) => sum + (m.type === 'deposit' ? m.amount : -m.amount), 0);
}

function sumInvestmentMovements(
  fixtures: DashboardFixtures,
  period: DashboardPeriod,
): number {
  return fixtures.investmentMovements
    .filter((m) => isDateInPeriod(m.date, period))
    .reduce((sum, m) => {
      if (m.type === 'withdrawal') return sum - m.amount;
      return sum + m.amount;
    }, 0);
}

export function buildDashboardSummary(
  period: DashboardPeriod,
  fixtures: DashboardFixtures,
): DashboardSummary {
  const categoryMap = getCategoryMap(fixtures.categories);

  const incomeFixed = sumFixedIncomes(fixtures, period);
  const incomeVariable = sumVariableIncomes(fixtures, period);
  const expenseFixed = sumFixedExpenses(fixtures, period);
  const expenseVariable = sumVariableExpenses(fixtures, period);

  const incomeTotal = incomeFixed + incomeVariable;
  const expenseTotal = expenseFixed + expenseVariable;

  const budgetMonthKey = getBudgetMonthKey(period);
  const budget = fixtures.monthlyBudgets.find((b) => b.month === budgetMonthKey) ?? null;

  const budgetLines = budget
    ? budget.lines.map((line) => {
        const category = categoryMap.get(line.categoryId);
        const remaining = getRemaining(line.plannedAmount, line.spentAmount);
        const usagePercent = getBudgetUsagePercent(line.spentAmount, line.plannedAmount);
        return {
          categoryId: line.categoryId,
          categoryName: category?.name ?? line.categoryId,
          color: category?.color ?? '#6b7280',
          plannedAmount: line.plannedAmount,
          spentAmount: line.spentAmount,
          remaining,
          usagePercent,
        };
      })
    : [];

  const totalPlanned = budget?.totalPlanned ?? 0;
  const totalSpent = budgetLines.reduce((s, l) => s + l.spentAmount, 0);
  const totalRemaining = getRemaining(totalPlanned, totalSpent);

  const investmentsTotal = fixtures.investmentPositions.reduce(
    (s, p) => s + p.currentValue,
    0,
  );

  return {
    period,
    periodLabel: formatPeriodLabel(period),
    income: {
      fixed: incomeFixed,
      variable: incomeVariable,
      total: incomeTotal,
    },
    expenses: {
      fixed: expenseFixed,
      variable: expenseVariable,
      total: expenseTotal,
    },
    balance: incomeTotal - expenseTotal,
    emergencyFund: {
      balance: fixtures.emergencyFundSnapshot.balance,
      targetAmount: fixtures.emergencyFundSnapshot.targetAmount,
      periodMovements: sumEmergencyMovements(fixtures, period),
    },
    investments: {
      totalValue: investmentsTotal,
      periodMovements: sumInvestmentMovements(fixtures, period),
    },
    expensesByCategory: buildExpensesByCategory(fixtures, period, categoryMap),
    monthlyBudget: {
      month: budgetMonthKey,
      monthLabel: formatMonthLabel(budgetMonthKey),
      budget,
      totalPlanned,
      totalSpent,
      totalRemaining,
      usagePercent: getBudgetUsagePercent(totalSpent, totalPlanned),
      lines: budgetLines,
    },
  };
}
