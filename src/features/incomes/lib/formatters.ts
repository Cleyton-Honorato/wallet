import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatReceiptDay(day: number): string {
  return `Dia ${day}`;
}

export function formatDateLabel(date: string): string {
  return format(parseISO(date), 'dd/MM/yyyy', { locale: ptBR });
}

export function formatPeriodRange(startDate: string, endDate?: string): string {
  const start = formatDateLabel(startDate);
  if (!endDate) return `${start} · sem término`;
  return `${start} → ${formatDateLabel(endDate)}`;
}

export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function shiftMonthKey(monthKey: string, delta: number): string {
  const [yearStr, monthStr] = monthKey.split('-');
  const date = new Date(Number(yearStr), Number(monthStr) - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function formatMonthKeyLabel(monthKey: string): string {
  const [yearStr, monthStr] = monthKey.split('-');
  const date = new Date(Number(yearStr), Number(monthStr) - 1, 1);
  return format(date, 'MMMM yyyy', { locale: ptBR });
}

export function parseTagsInput(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatTags(tags?: string[]): string {
  return tags?.join(', ') ?? '';
}
