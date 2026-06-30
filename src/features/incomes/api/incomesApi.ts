import { baseApi } from '@app/api';
import type {
  CreateFixedIncomeRequest,
  CreateVariableIncomeRequest,
  FixedIncome,
  UpdateFixedIncomeRequest,
  UpdateVariableIncomeRequest,
  VariableIncome,
} from '../types/income.types';

interface ApiFixedIncome {
  id: number;
  categoryId: number;
  title: string;
  amount: number;
  description: string | null;
  receiptDay: number;
  isActive: boolean;
  startDate: string;
  endDate: string | null;
  received: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiVariableIncome {
  id: number;
  categoryId: number;
  title: string;
  estimatedAmount: number;
  actualAmount: number | null;
  description: string | null;
  month: string;
  isReceived: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

function toFixedIncome(raw: ApiFixedIncome): FixedIncome {
  return {
    id: String(raw.id),
    categoryId: String(raw.categoryId),
    title: raw.title,
    amount: raw.amount,
    description: raw.description ?? undefined,
    receiptDay: raw.receiptDay,
    isActive: raw.isActive,
    startDate: raw.startDate,
    endDate: raw.endDate ?? undefined,
    received: raw.received,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function toVariableIncome(raw: ApiVariableIncome): VariableIncome {
  return {
    id: String(raw.id),
    categoryId: String(raw.categoryId),
    title: raw.title,
    estimatedAmount: raw.estimatedAmount,
    actualAmount: raw.actualAmount ?? undefined,
    description: raw.description ?? undefined,
    month: raw.month,
    isReceived: raw.isReceived,
    tags: raw.tags,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const incomesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFixedIncomes: builder.query<FixedIncome[], string | void>({
      query: (month) =>
        month ? `/incomes/fixed?month=${month}` : '/incomes/fixed',
      transformResponse: (raw: ApiFixedIncome[]) => raw.map(toFixedIncome),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'FixedIncome' as const, id })),
              { type: 'FixedIncome', id: 'LIST' },
            ]
          : [{ type: 'FixedIncome', id: 'LIST' }],
    }),
    settleFixedIncome: builder.mutation<
      FixedIncome,
      { id: string; month: string; received: boolean }
    >({
      query: ({ id, month, received }) => ({
        url: `/incomes/fixed/${id}/settlement`,
        method: 'PUT',
        body: { month, received },
      }),
      transformResponse: toFixedIncome,
      invalidatesTags: [{ type: 'FixedIncome', id: 'LIST' }, 'Dashboard'],
    }),
    bulkSettleVariableIncomes: builder.mutation<
      { updated: number },
      { categoryId: number; month: string; received: boolean }
    >({
      query: (body) => ({ url: '/incomes/variable/settle', method: 'POST', body }),
      invalidatesTags: [{ type: 'VariableIncome', id: 'LIST' }, 'Dashboard'],
    }),
    createFixedIncome: builder.mutation<FixedIncome, CreateFixedIncomeRequest>({
      query: (body) => ({ url: '/incomes/fixed', method: 'POST', body }),
      transformResponse: toFixedIncome,
      invalidatesTags: [{ type: 'FixedIncome', id: 'LIST' }, 'Dashboard'],
    }),
    updateFixedIncome: builder.mutation<
      FixedIncome,
      { id: string; body: UpdateFixedIncomeRequest }
    >({
      query: ({ id, body }) => ({
        url: `/incomes/fixed/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: toFixedIncome,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'FixedIncome', id },
        { type: 'FixedIncome', id: 'LIST' },
        'Dashboard',
      ],
    }),
    deleteFixedIncome: builder.mutation<void, string>({
      query: (id) => ({ url: `/incomes/fixed/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'FixedIncome', id: 'LIST' }, 'Dashboard'],
    }),
    getVariableIncomes: builder.query<VariableIncome[], string | void>({
      query: (month) =>
        month ? `/incomes/variable?month=${month}` : '/incomes/variable',
      transformResponse: (raw: ApiVariableIncome[]) => raw.map(toVariableIncome),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'VariableIncome' as const, id })),
              { type: 'VariableIncome', id: 'LIST' },
            ]
          : [{ type: 'VariableIncome', id: 'LIST' }],
    }),
    createVariableIncome: builder.mutation<VariableIncome, CreateVariableIncomeRequest>({
      query: (body) => ({ url: '/incomes/variable', method: 'POST', body }),
      transformResponse: toVariableIncome,
      invalidatesTags: [{ type: 'VariableIncome', id: 'LIST' }, 'Dashboard'],
    }),
    updateVariableIncome: builder.mutation<
      VariableIncome,
      { id: string; body: UpdateVariableIncomeRequest }
    >({
      query: ({ id, body }) => ({
        url: `/incomes/variable/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: toVariableIncome,
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'VariableIncome', id },
        { type: 'VariableIncome', id: 'LIST' },
        'Dashboard',
      ],
    }),
    deleteVariableIncome: builder.mutation<void, string>({
      query: (id) => ({ url: `/incomes/variable/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'VariableIncome', id: 'LIST' }, 'Dashboard'],
    }),
  }),
});

export const {
  useGetFixedIncomesQuery,
  useCreateFixedIncomeMutation,
  useUpdateFixedIncomeMutation,
  useDeleteFixedIncomeMutation,
  useSettleFixedIncomeMutation,
  useBulkSettleVariableIncomesMutation,
  useGetVariableIncomesQuery,
  useCreateVariableIncomeMutation,
  useUpdateVariableIncomeMutation,
  useDeleteVariableIncomeMutation,
} = incomesApi;
