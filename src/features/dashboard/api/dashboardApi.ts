import { baseApi } from '@app/api';
import type {
  DashboardPeriod,
  DashboardSummary,
} from '@features/dashboard/types/dashboard.types';
import {
  formatMonthLabel,
  formatPeriodLabel,
} from '@features/dashboard/lib/periodUtils';

/** Forma crua retornada por GET /dashboard/summary (ids numéricos, sem labels). */
interface ApiCategorySlice {
  categoryId: number;
  categoryName: string;
  color: string;
  amount: number;
  percentage: number;
}

interface ApiBudgetLine {
  categoryId: number;
  categoryName: string;
  color: string;
  plannedAmount: number;
  spentAmount: number;
  remaining: number;
  usagePercent: number;
}

interface ApiDashboardSummary {
  period: { year: number; month: number | null };
  income: DashboardSummary['income'];
  expenses: DashboardSummary['expenses'];
  balance: number;
  emergencyFund: DashboardSummary['emergencyFund'];
  investments: DashboardSummary['investments'];
  expensesByCategory: ApiCategorySlice[];
  monthlyBudget: {
    month: string;
    totalPlanned: number;
    totalSpent: number;
    totalRemaining: number;
    usagePercent: number;
    lines: ApiBudgetLine[];
  };
}

function toSummary(
  raw: ApiDashboardSummary,
  period: DashboardPeriod,
): DashboardSummary {
  const mb = raw.monthlyBudget;
  const lines = mb.lines.map((line) => ({
    categoryId: String(line.categoryId),
    categoryName: line.categoryName,
    color: line.color,
    plannedAmount: line.plannedAmount,
    spentAmount: line.spentAmount,
    remaining: line.remaining,
    usagePercent: line.usagePercent,
  }));

  const hasBudget = mb.totalPlanned > 0 || lines.length > 0;

  return {
    period,
    periodLabel: formatPeriodLabel(period),
    income: raw.income,
    expenses: raw.expenses,
    balance: raw.balance,
    emergencyFund: raw.emergencyFund,
    investments: raw.investments,
    expensesByCategory: raw.expensesByCategory.map((slice) => ({
      categoryId: String(slice.categoryId),
      categoryName: slice.categoryName,
      color: slice.color,
      amount: slice.amount,
      percentage: slice.percentage,
    })),
    monthlyBudget: {
      month: mb.month,
      monthLabel: formatMonthLabel(mb.month),
      budget: hasBudget
        ? {
            id: mb.month,
            month: mb.month,
            totalPlanned: mb.totalPlanned,
            lines: lines.map((l) => ({
              categoryId: l.categoryId,
              plannedAmount: l.plannedAmount,
              spentAmount: l.spentAmount,
            })),
            createdAt: '',
            updatedAt: '',
          }
        : null,
      totalPlanned: mb.totalPlanned,
      totalSpent: mb.totalSpent,
      totalRemaining: mb.totalRemaining,
      usagePercent: mb.usagePercent,
      lines,
    },
  };
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<DashboardSummary, DashboardPeriod>({
      query: ({ year, month }) => {
        const params = new URLSearchParams({ year: String(year) });
        if (month !== undefined) params.set('month', String(month));
        return `/dashboard/summary?${params.toString()}`;
      },
      transformResponse: (raw: ApiDashboardSummary, _meta, arg) =>
        toSummary(raw, arg),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;
