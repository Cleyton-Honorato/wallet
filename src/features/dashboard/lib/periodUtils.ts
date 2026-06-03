import { format, parseISO, startOfMonth, endOfMonth, startOfYear, endOfYear, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DashboardPeriod } from '@features/dashboard/types/dashboard.types';

export function getPeriodBounds(period: DashboardPeriod): { start: Date; end: Date } {
  if (period.month !== undefined && period.month >= 1 && period.month <= 12) {
    const start = startOfMonth(new Date(period.year, period.month - 1, 1));
    const end = endOfMonth(start);
    return { start, end };
  }
  const start = startOfYear(new Date(period.year, 0, 1));
  const end = endOfYear(start);
  return { start, end };
}

export function isDateInPeriod(dateStr: string, period: DashboardPeriod): boolean {
  const date = parseISO(dateStr);
  const { start, end } = getPeriodBounds(period);
  return isWithinInterval(date, { start, end });
}

export function isMonthInPeriod(monthStr: string, period: DashboardPeriod): boolean {
  const [yearStr, monthPart] = monthStr.split('-');
  const year = Number(yearStr);
  const month = Number(monthPart);
  if (period.month !== undefined && period.month >= 1) {
    return year === period.year && month === period.month;
  }
  return year === period.year;
}

export function countActiveMonthsInPeriod(
  startDate: string,
  endDate: string | undefined,
  period: DashboardPeriod,
): number {
  const { start: periodStart, end: periodEnd } = getPeriodBounds(period);
  const itemStart = parseISO(startDate);
  const itemEnd = endDate ? parseISO(endDate) : periodEnd;

  const effectiveStart = itemStart > periodStart ? itemStart : periodStart;
  const effectiveEnd = itemEnd < periodEnd ? itemEnd : periodEnd;

  if (effectiveStart > effectiveEnd) return 0;

  if (period.month !== undefined && period.month >= 1) {
    return 1;
  }

  let count = 0;
  const cursor = new Date(effectiveStart.getFullYear(), effectiveStart.getMonth(), 1);
  const last = new Date(effectiveEnd.getFullYear(), effectiveEnd.getMonth(), 1);

  while (cursor <= last) {
    count += 1;
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return count;
}

export function formatPeriodLabel(period: DashboardPeriod): string {
  if (period.month !== undefined && period.month >= 1 && period.month <= 12) {
    const date = new Date(period.year, period.month - 1, 1);
    return format(date, 'MMMM yyyy', { locale: ptBR });
  }
  return `Anual ${period.year}`;
}

export function getBudgetMonthKey(period: DashboardPeriod): string {
  if (period.month !== undefined && period.month >= 1 && period.month <= 12) {
    return `${period.year}-${String(period.month).padStart(2, '0')}`;
  }
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}`;
}

export function formatMonthLabel(monthKey: string): string {
  const [yearStr, monthPart] = monthKey.split('-');
  const date = new Date(Number(yearStr), Number(monthPart) - 1, 1);
  return format(date, 'MMMM yyyy', { locale: ptBR });
}

export function getDefaultPeriod(): DashboardPeriod {
  return { year: new Date().getFullYear() };
}
