import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '@app/hooks';
import logo from '@assets/images/logo.png';
import { useLoginMutation } from '../api/authApi';
import { selectIsAuthenticated } from '../store/authSlice';
import { getErrorMessage } from '../lib/getErrorMessage';
import styles from './AuthPage.module.css';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Informe a senha'),
});

type LoginForm = z.infer<typeof schema>;

interface LocationState {
  from?: { pathname: string };
}

export default function LoginPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: LoginForm) => {
    try {
      await login(values).unwrap();
      const to = (location.state as LocationState)?.from?.pathname ?? '/';
      navigate(to, { replace: true });
    } catch {
      /* erro exibido via `error` abaixo */
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <img src={logo} alt="Wallet" />
          <span className={styles.brandText}>Wallet</span>
        </div>
        <p className={styles.subtitle}>Entre na sua conta</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && (
            <div className={styles.formError}>
              {getErrorMessage(error, 'Não foi possível entrar')}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className={styles.input}
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className={styles.switch}>
          Não tem conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}
