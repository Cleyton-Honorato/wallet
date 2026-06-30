import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { env } from '@config/env';
import type { RootState } from './store';
import { logout } from '@features/auth/store/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * Base query que desloga globalmente em respostas 401 (token ausente/expirado).
 * O guard de rotas redireciona para /login ao detectar a ausência do token.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

/**
 * Base API instance for RTK Query.
 * Features inject their own endpoints via `baseApi.injectEndpoints()`.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Transaction', 'Category', 'Budget', 'User', 'Dashboard', 'FixedExpense', 'VariableExpense', 'FixedIncome', 'VariableIncome', 'EmergencyFund'],
  endpoints: () => ({}),
});
