import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';

// Lazy-loaded feature pages
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage'));
const FixedExpensesPage = lazy(() => import('@features/expenses/pages/FixedExpensesPage'));
const VariableExpensesPage = lazy(() => import('@features/expenses/pages/VariableExpensesPage'));
const FixedIncomesPage = lazy(() => import('@features/incomes/pages/FixedIncomesPage'));
const VariableIncomesPage = lazy(() => import('@features/incomes/pages/VariableIncomesPage'));
const TransactionsPage = lazy(() => import('@features/transactions/pages/TransactionsPage'));
const CategoriesPage = lazy(() => import('@features/categories/pages/CategoriesPage'));
const BudgetsPage = lazy(() => import('@features/budgets/pages/BudgetsPage'));
const ReportsPage = lazy(() => import('@features/reports/pages/ReportsPage'));
const LoginPage = lazy(() => import('@features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@features/auth/pages/RegisterPage'));

// Layout
import { AppLayout } from '@shared/components/layout';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';

/**
 * Fallback component while lazy pages load
 */
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="animate-spin" style={{
        width: 32,
        height: 32,
        border: '3px solid var(--border-primary)',
        borderTopColor: 'var(--color-primary-500)',
        borderRadius: '50%',
      }} />
    </div>
  );
}

/**
 * Application router configuration.
 * Each feature's pages are lazy-loaded for optimal performance.
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<PageLoader />}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'expenses/fixed',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FixedExpensesPage />
          </Suspense>
        ),
      },
      {
        path: 'expenses/variable',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VariableExpensesPage />
          </Suspense>
        ),
      },
      {
        path: 'incomes/fixed',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FixedIncomesPage />
          </Suspense>
        ),
      },
      {
        path: 'incomes/variable',
        element: (
          <Suspense fallback={<PageLoader />}>
            <VariableIncomesPage />
          </Suspense>
        ),
      },
      {
        path: 'transactions',
        element: (
          <Suspense fallback={<PageLoader />}>
            <TransactionsPage />
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CategoriesPage />
          </Suspense>
        ),
      },
      {
        path: 'budgets',
        element: (
          <Suspense fallback={<PageLoader />}>
            <BudgetsPage />
          </Suspense>
        ),
      },
      {
        path: 'reports',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ReportsPage />
          </Suspense>
        ),
      },
        ],
      },
    ],
  },
]);
