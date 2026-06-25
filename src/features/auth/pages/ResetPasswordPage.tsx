import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router';
import { useAppSelector } from '@app/hooks';
import logo from '@assets/images/logo.png';
import { useResetPasswordMutation } from '../api/authApi';
import { selectIsAuthenticated } from '../store/authSlice';
import { getErrorMessage } from '../lib/getErrorMessage';
import styles from './AuthPage.module.css';

const schema = z
  .object({
    token: z.string().min(1, 'Informe o código de redefinição'),
    password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a nova senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ResetPasswordForm = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: searchParams.get('token') ?? '',
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: ResetPasswordForm) => {
    try {
      await resetPassword({
        token: values.token,
        password: values.password,
      }).unwrap();
      navigate('/login', { replace: true, state: { passwordReset: true } });
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
        <p className={styles.subtitle}>Defina uma nova senha</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && (
            <div className={styles.formError}>
              {getErrorMessage(error, 'Não foi possível redefinir a senha')}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="token">
              Código de redefinição
            </label>
            <input
              id="token"
              type="text"
              className={styles.input}
              autoComplete="off"
              {...register('token')}
            />
            {errors.token && (
              <span className={styles.fieldError}>{errors.token.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirmar nova senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className={styles.fieldError}>{errors.confirmPassword.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Salvando…' : 'Redefinir senha'}
          </button>
        </form>

        <p className={styles.switch}>
          <Link to="/forgot-password">Gerar novo código</Link>
          {' · '}
          <Link to="/login">Voltar ao login</Link>
        </p>
      </div>
    </div>
  );
}
