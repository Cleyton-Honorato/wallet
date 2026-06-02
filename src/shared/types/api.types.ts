/**
 * Common API response types shared across features.
 */

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

/** Standard API error shape */
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

/** Standard API success response */
export interface ApiSuccessResponse<T = void> {
  data: T;
  message?: string;
}
