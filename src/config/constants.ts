/**
 * Application constants
 */

/** Default currency for formatting */
export const DEFAULT_CURRENCY = 'BRL';

/** Default locale for formatting */
export const DEFAULT_LOCALE = 'pt-BR';

/** App name */
export const APP_NAME = 'Wallet';

/** Pagination defaults */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/** Transaction types */
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  TRANSFER: 'transfer',
} as const;

/** Local storage keys */
export const STORAGE_KEYS = {
  TOKEN: 'wallet_token',
  USER: 'wallet_user',
  THEME: 'wallet_theme',
  DASHBOARD_PERIOD: 'wallet_dashboard_period',
} as const;

/** Dashboard period filter */
export const DASHBOARD_PERIOD_MODES = {
  ANNUAL: 'annual',
  MONTHLY: 'monthly',
} as const;

export const DASHBOARD_AVAILABLE_YEARS = [2024, 2025, 2026] as const;

export const DASHBOARD_MONTH_OPTIONS = [
  { value: 0, label: 'Anual' },
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Março' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
] as const;

/** Date format patterns */
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  MONTH_YEAR: 'MMMM yyyy',
  SHORT_MONTH: 'MMM yyyy',
} as const;
