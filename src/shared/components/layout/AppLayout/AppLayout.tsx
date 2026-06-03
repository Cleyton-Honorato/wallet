import { Outlet } from 'react-router';
import { Header } from '../Header';
import styles from './AppLayout.module.css';

/**
 * Main application layout shell.
 * Composes a floating Header over a full-width content area (Outlet for router).
 */
export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
