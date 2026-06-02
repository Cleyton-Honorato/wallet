import { NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  PiggyBank,
  BarChart3,
  PanelLeftClose,
  PanelLeftOpen,
  Wallet,
} from 'lucide-react';
import { cn } from '@shared/utils/cn';
import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  {
    section: 'Menu',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/transactions', label: 'Transações', icon: ArrowLeftRight },
      { to: '/categories', label: 'Categorias', icon: Tags },
    ],
  },
  {
    section: 'Planejamento',
    items: [
      { to: '/budgets', label: 'Orçamentos', icon: PiggyBank },
      { to: '/reports', label: 'Relatórios', icon: BarChart3 },
    ],
  },
];

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(styles.overlay, mobileOpen && styles.visible)}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={cn(
          styles.sidebar,
          collapsed && styles.collapsed,
          mobileOpen && styles.mobileOpen,
        )}
        id="main-sidebar"
      >
        {/* Logo */}
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Wallet size={18} />
          </div>
          <span className={styles.logoText}>Wallet</span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {navItems.map((section) => (
            <div key={section.section} className={styles.navSection}>
              <div className={styles.navSectionLabel}>{section.section}</div>
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onCloseMobile}
                  className={cn(
                    styles.navLink,
                    (item.to === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.to)) && styles.active,
                  )}
                >
                  <item.icon className={styles.navLinkIcon} size={20} />
                  <span className={styles.navLinkText}>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className={styles.sidebarFooter}>
          <button
            type="button"
            className={styles.collapseBtn}
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            <span className={styles.collapseBtnText}>
              {collapsed ? 'Expandir' : 'Recolher'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
