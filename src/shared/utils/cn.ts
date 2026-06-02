/**
 * Utility to conditionally join CSS class names.
 *
 * @example
 * cn('base', isActive && 'active', hasError && 'error')
 * // => "base active" (if isActive is true and hasError is false)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
