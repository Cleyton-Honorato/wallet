import { useState, useCallback } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { useMediaQuery } from '@shared/hooks/useMediaQuery';
import { STORAGE_KEYS } from '@config/constants';
import { cn } from '@shared/utils/cn';
import styles from './AppLayout.module.css';

/**
 * Main application layout shell.
 * Composes Sidebar + Header + content area (Outlet for router).
 */
export function AppLayout() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [collapsed, setCollapsed] = useLocalStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, [setCollapsed]);

  const handleOpenMobile = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div className={cn(styles.layout, collapsed && !isMobile && styles.sidebarCollapsed)}>
      <Sidebar
        collapsed={collapsed && !isMobile}
        onToggleCollapse={handleToggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobile}
      />

      <div className={styles.mainArea}>
        <Header onOpenMobileSidebar={handleOpenMobile} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
