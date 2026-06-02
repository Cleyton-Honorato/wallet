import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';

// Lazy-loaded feature pages
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage'));
const TransactionsPage = lazy(() => import('@features/transactions/pages/TransactionsPage'));
const CategoriesPage = lazy(() => import('@features/categories/pages/CategoriesPage'));
const BudgetsPage = lazy(() => import('@features/budgets/pages/BudgetsPage'));
const ReportsPage = lazy(() => import('@features/reports/pages/ReportsPage'));

// Layout
import { AppLayout } from '@shared/components/layout';

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
]);
