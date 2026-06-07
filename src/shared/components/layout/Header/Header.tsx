import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  PiggyBank,
  BarChart3,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  Calendar,
  DollarSign,
  Repeat,
  Shuffle,
  ChevronDown,
  LogOut,
  type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@shared/hooks/useTheme';
import { useMediaQuery } from '@shared/hooks/useMediaQuery';
import { cn } from '@shared/utils/cn';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { logout, selectAuthUser } from '@features/auth/store/authSlice';
import styles from './Header.module.css';
import logo from '@assets/images/logo.png';

interface NavLeaf {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  label: string;
  icon: LucideIcon;
  children: NavLeaf[];
}

type NavItem = NavLeaf | NavGroup;

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Despesas',
    icon: Calendar,
    children: [
      { to: '/expenses/fixed', label: 'Despesas Fixas', icon: Repeat },
      { to: '/expenses/variable', label: 'Despesas Variáveis', icon: Shuffle },
    ],
  },
  {
    label: 'Receitas',
    icon: DollarSign,
    children: [
      { to: '/incomes/fixed', label: 'Receitas Fixas', icon: Repeat },
      { to: '/incomes/variable', label: 'Receitas Variáveis', icon: Shuffle },
    ],
  },
  { to: '/transactions', label: 'Transações', icon: ArrowLeftRight },
  { to: '/categories', label: 'Categorias', icon: Tags },
  { to: '/budgets', label: 'Orçamentos', icon: PiggyBank },
  { to: '/reports', label: 'Relatórios', icon: BarChart3 },
];

/**
 * Floating top navigation bar.
 * Holds the logo, primary navigation (with dropdown groups) and quick actions.
 * On mobile the navigation collapses into a dropdown panel.
 */
export function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const userInitial = user?.name?.charAt(0).toUpperCase() ?? '?';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const isGroupActive = (group: NavGroup) =>
    group.children.some((child) => isActive(child.to));

  const closeAll = () => {
    setMobileOpen(false);
    setOpenMenu(null);
  };

  // Close dropdowns when clicking outside the nav or pressing Escape.
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeAll();
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className={styles.header} id="main-header">
      <div className={styles.bar}>
        {/* Logo */}
        <NavLink to="/" className={styles.logoArea} onClick={closeAll}>
          <div className={styles.logoIcon}>
            <img src={logo} alt="Wallet" />
          </div>
          <span className={styles.logoText}>Wallet</span>
        </NavLink>

        {/* Navigation */}
        <nav ref={navRef} className={cn(styles.nav, mobileOpen && styles.navOpen)}>
          {navItems.map((item) =>
            'children' in item ? (
              <div
                key={item.label}
                className={styles.navGroup}
                onMouseEnter={isDesktop ? () => setOpenMenu(item.label) : undefined}
                onMouseLeave={isDesktop ? () => setOpenMenu(null) : undefined}
              >
                <button
                  type="button"
                  className={cn(
                    styles.navLink,
                    (isGroupActive(item) || openMenu === item.label) && styles.active,
                  )}
                  onClick={() => {
                    if (!isDesktop) {
                      setOpenMenu((prev) => (prev === item.label ? null : item.label));
                    }
                  }}
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                >
                  <item.icon className={styles.navLinkIcon} size={18} />
                  <span className={styles.navLinkText}>{item.label}</span>
                  <ChevronDown
                    className={cn(
                      styles.navCaret,
                      openMenu === item.label && styles.navCaretOpen,
                    )}
                    size={16}
                  />
                </button>

                <div
                  className={cn(
                    styles.submenu,
                    openMenu === item.label && styles.submenuOpen,
                  )}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      onClick={closeAll}
                      className={cn(styles.submenuLink, isActive(child.to) && styles.active)}
                    >
                      <child.icon className={styles.submenuIcon} size={16} />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeAll}
                className={cn(styles.navLink, isActive(item.to) && styles.active)}
              >
                <item.icon className={styles.navLinkIcon} size={18} />
                <span className={styles.navLinkText}>{item.label}</span>
              </NavLink>
            ),
          )}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button type="button" className={styles.iconBtn} aria-label="Notificações">
            <Bell size={18} />
          </button>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div
            className={styles.avatar}
            aria-label="Perfil do usuário"
            title={user?.name ?? undefined}
          >
            {userInitial}
          </div>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleLogout}
            aria-label="Sair"
            title="Sair"
          >
            <LogOut size={18} />
          </button>

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
