import { useGetDashboardSummaryQuery } from '@features/dashboard/api/dashboardApi';
import type { DashboardPeriod } from '@features/dashboard/types/dashboard.types';

export function useDashboardSummary(period: DashboardPeriod) {
  const { data, isLoading, isFetching, error } =
    useGetDashboardSummaryQuery(period);

  return {
    summary: data ?? null,
    isLoading: isLoading || isFetching,
    error: error ? 'Não foi possível carregar o dashboard' : null,
  };
}
