import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '@app/hooks';
import { selectIsAuthenticated } from '../store/authSlice';

/**
 * Protege a subárvore de rotas: sem token, redireciona para /login
 * preservando o destino original em `state.from`.
 */
export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
