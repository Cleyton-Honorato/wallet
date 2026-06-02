import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // Feature slices will be registered here as they are created
    // auth: authSlice.reducer,
    // transactions: transactionsSlice.reducer,
    // categories: categoriesSlice.reducer,
    // budgets: budgetsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
