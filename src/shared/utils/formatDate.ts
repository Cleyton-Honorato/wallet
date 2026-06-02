import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DATE_FORMATS } from '@config/constants';

/**
 * Format a date string or Date object.
 *
 * @example
 * formatDate('2024-03-15') // "15/03/2024"
 * formatDate('2024-03-15', 'MMMM yyyy') // "março 2024"
 */
export function formatDate(
  date: string | Date,
  pattern: string = DATE_FORMATS.DISPLAY,
): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return '—';
  return format(parsed, pattern, { locale: ptBR });
}

/**
 * Format a date as relative time (e.g., "há 2 dias").
 */
export function formatRelativeDate(date: string | Date): string {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return '—';
  return formatDistanceToNow(parsed, { addSuffix: true, locale: ptBR });
}

/**
 * Format a date for API consumption (yyyy-MM-dd).
 */
export function formatDateForApi(date: Date): string {
  return format(date, DATE_FORMATS.API);
}
