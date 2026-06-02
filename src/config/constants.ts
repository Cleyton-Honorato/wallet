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
  THEME: 'wallet_theme',
  SIDEBAR_COLLAPSED: 'wallet_sidebar_collapsed',
} as const;

/** Date format patterns */
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  MONTH_YEAR: 'MMMM yyyy',
  SHORT_MONTH: 'MMM yyyy',
} as const;
