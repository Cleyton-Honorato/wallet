import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@config/constants';
import type { Theme } from '@shared/types/common.types';

/**
 * Manage the app theme (light/dark) with localStorage persistence.
 * Updates the `data-theme` attribute on the document element.
 *
 * @example
 * const { theme, toggleTheme } = useTheme();
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.THEME, 'dark');

  const applyTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      applyTheme(next);
      return next;
    });
  }, [setTheme, applyTheme]);

  // Apply theme on first call
  applyTheme(theme);

  return { theme, setTheme, toggleTheme };
}
