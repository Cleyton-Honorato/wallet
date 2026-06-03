import { useCallback } from 'react';
import { STORAGE_KEYS } from '@config/constants';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import type { DashboardPeriod } from '@features/dashboard/types/dashboard.types';
import { getDefaultPeriod } from '@features/dashboard/lib/periodUtils';

export function useDashboardPeriod() {
  const [period, setPeriod] = useLocalStorage<DashboardPeriod>(
    STORAGE_KEYS.DASHBOARD_PERIOD,
    getDefaultPeriod(),
  );

  const setYear = useCallback(
    (year: number) => {
      setPeriod((prev) => ({ year, month: prev.month }));
    },
    [setPeriod],
  );

  const setMonth = useCallback(
    (month: number) => {
      setPeriod((prev) => {
        if (month === 0) {
          return { year: prev.year };
        }
        return { year: prev.year, month };
      });
    },
    [setPeriod],
  );

  return { period, setPeriod, setYear, setMonth };
}
