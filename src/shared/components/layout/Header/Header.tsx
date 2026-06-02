import { useLocation } from 'react-router';
import { Menu, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '@shared/hooks/useTheme';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/transactions': 'Transações',
  '/categories': 'Categorias',
  '/budgets': 'Orçamentos',
  '/reports': 'Relatórios',
};

export function Header({ onOpenMobileSidebar }: HeaderProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const pageTitle = pageTitles[location.pathname] || 'Wallet';

  return (
    <header className={styles.header} id="main-header">
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onOpenMobileSidebar}
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
      </div>

      <div className={styles.right}>
        <button
          type="button"
          className={styles.iconBtn}
          aria-label="Notificações"
        >
          <Bell size={18} />
        </button>

        <button
          type="button"
          className={styles.themeBtn}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className={styles.avatar} aria-label="Perfil do usuário">
          C
        </div>
      </div>
    </header>
  );
}
