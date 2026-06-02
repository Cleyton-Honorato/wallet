import type { ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface PageContainerProps {
  children: ReactNode;
}

/**
 * Wrapper component for page content.
 * Provides consistent padding, max-width, and entry animation.
 */
export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className={styles.container}>
      {children}
    </main>
  );
}
