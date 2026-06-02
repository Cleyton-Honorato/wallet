/**
 * Typed environment variables.
 * All env vars accessed through this module for type safety.
 */
export const env = {
  /** Base URL for API requests */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string || '/api',

  /** Current environment */
  MODE: import.meta.env.MODE as 'development' | 'production' | 'test',

  /** Is development mode */
  IS_DEV: import.meta.env.DEV,

  /** Is production mode */
  IS_PROD: import.meta.env.PROD,
} as const;
