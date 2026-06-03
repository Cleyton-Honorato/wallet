import { useMemo } from 'react';
import { dashboardFixtures } from '@features/dashboard/mocks/fixtures';
import { buildDashboardSummary } from '@features/dashboard/lib/aggregations';
import type { DashboardPeriod } from '@features/dashboard/types/dashboard.types';

export function useDashboardSummary(period: DashboardPeriod) {
  const summary = useMemo(
    () => buildDashboardSummary(period, dashboardFixtures),
    [period.year, period.month],
  );

  return {
    summary,
    isLoading: false,
    error: null as string | null,
  };
}
