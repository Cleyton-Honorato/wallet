/**
 * Common types shared across the entire application.
 */

/** Generic select option type */
export interface SelectOption<T = string> {
  label: string;
  value: T;
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc';

/** Sort config */
export interface SortConfig {
  field: string;
  direction: SortDirection;
}

/** Filter base */
export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

/** Theme */
export type Theme = 'light' | 'dark';

/** Nullable utility */
export type Nullable<T> = T | null;
