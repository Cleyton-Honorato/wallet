import { baseApi } from '@app/api';
import type {
  CreateFixedExpenseRequest,
  CreateVariableExpenseRequest,
  FixedExpense,
  UpdateFixedExpenseRequest,
  UpdateVariableExpenseRequest,
  VariableExpense,
} from '../types/expense.types';

interface ApiFixedExpense {
  id: number;
  categoryId: number;
  title: string;
  amount: number;
  description: string | null;
  dueDay: number;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiVariableExpense {
  id: number;
  categoryId: number;
  title: string;
  estimatedAmount: number;
  actualAmount: number | null;
  description: string | null;
  month: string;
  isPaid: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

function toFixedExpense(raw: ApiFixedExpense): FixedExpense {
  return {
    id: String(raw.id),
    categoryId: String(raw.categoryId),
    title: raw.title,
    amount: raw.amount,
    description: raw.description ?? undefined,
    dueDay: raw.dueDay,
    isActive: raw.isActive,
    startDate: raw.startDate,
    endDate: raw.endDate ?? undefined,
    paid: raw.paid,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function toVariableExpense(raw: ApiVariableExpense): VariableExpense {
  return {
    id: String(raw.id),
    categoryId: String(raw.categoryId),
    title: raw.title,
    estimatedAmount: raw.estimatedAmount,
    actualAmount: raw.actualAmount ?? undefined,
    description: raw.description ?? undefined,
    month: raw.month,
    isPaid: raw.isPaid,
    tags: raw.tags,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFixedExpenses: builder.query<FixedExpense[], string | void>({
      query: (month) =>
        month ? `/expenses/fixed?month=${month}` : '/expenses/fixed',
      transformResponse: (raw: ApiFixedExpense[]) => raw.map(toFixedExpense),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'FixedExpense' as const, id })),
              { type: 'FixedExpense', id: 'LIST' },
            ]
          : [{ type: 'FixedExpense', id: 'LIST' }],
    }),
    settleFixedExpense: builder.mutation<
      FixedExpense,
      { id: string; month: string; paid: boolean }
    >({
      query: ({ id, month, paid }) => ({
        url: `/expenses/fixed/${id}/settlement`,
        method: 'PUT',
        body: { month, paid },
      }),
      transformResponse: toFixedExpense,
      invalidatesTags: [{ type: 'FixedExpense', id: 'LIST' }, 'Dashboard'],
    }),
    bulkSettleVariableExpenses: builder.mutation<
      { updated: number },
      { categoryId: number; month: string; paid: boolean }
    >({
      query: (body) => ({ url: '/expenses/variable/settle', method: 'POST', body }),
      invalidatesTags: [{ type: 'VariableExpense', id: 'LIST' }, 'Dashboard'],
    }),
    createFixedExpense: builder.mutation<FixedExpense, CreateFixedExpenseRequest>({
      query: (body) => ({ url: '/expenses/fixed', method: 'POST', body }),
      transformResponse: toFixedExpense,
      invalidatesTags: [{ type: 'FixedExpense', id: 'LIST' }, 'Dashboard'],
    }),
    updateFixedExpense: builder.mutation<
      FixedExpense,
      { id: string; body: UpdateFixedExpenseRequest }
    >({
      query: ({ id, body }) => ({
        url: `/expenses/fixed/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: toFixedExpense,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'FixedExpense', id },
        { type: 'FixedExpense', id: 'LIST' },
        'Dashboard',
      ],
    }),
    deleteFixedExpense: builder.mutation<void, string>({
      query: (id) => ({ url: `/expenses/fixed/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'FixedExpense', id: 'LIST' }, 'Dashboard'],
    }),
    getVariableExpenses: builder.query<VariableExpense[], string | void>({
      query: (month) =>
        month ? `/expenses/variable?month=${month}` : '/expenses/variable',
      transformResponse: (raw: ApiVariableExpense[]) => raw.map(toVariableExpense),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'VariableExpense' as const, id })),
              { type: 'VariableExpense', id: 'LIST' },
            ]
          : [{ type: 'VariableExpense', id: 'LIST' }],
    }),
    createVariableExpense: builder.mutation<VariableExpense, CreateVariableExpenseRequest>({
      query: (body) => ({ url: '/expenses/variable', method: 'POST', body }),
      transformResponse: toVariableExpense,
      invalidatesTags: [{ type: 'VariableExpense', id: 'LIST' }, 'Dashboard'],
    }),
    updateVariableExpense: builder.mutation<
      VariableExpense,
      { id: string; body: UpdateVariableExpenseRequest }
    >({
      query: ({ id, body }) => ({
        url: `/expenses/variable/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: toVariableExpense,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'VariableExpense', id },
        { type: 'VariableExpense', id: 'LIST' },
        'Dashboard',
      ],
    }),
    deleteVariableExpense: builder.mutation<void, string>({
      query: (id) => ({ url: `/expenses/variable/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'VariableExpense', id: 'LIST' }, 'Dashboard'],
    }),
  }),
});

export const {
  useGetFixedExpensesQuery,
  useCreateFixedExpenseMutation,
  useUpdateFixedExpenseMutation,
  useDeleteFixedExpenseMutation,
  useSettleFixedExpenseMutation,
  useBulkSettleVariableExpensesMutation,
  useGetVariableExpensesQuery,
  useCreateVariableExpenseMutation,
  useUpdateVariableExpenseMutation,
  useDeleteVariableExpenseMutation,
} = expensesApi;
