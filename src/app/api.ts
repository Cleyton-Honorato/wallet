import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API instance for RTK Query.
 * Features inject their own endpoints via `baseApi.injectEndpoints()`.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Transaction', 'Category', 'Budget', 'User'],
  endpoints: () => ({}),
});
