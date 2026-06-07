import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, Navigate, useNavigate } from 'react-router';
import { useAppSelector } from '@app/hooks';
import logo from '@assets/images/logo.png';
import { useRegisterMutation } from '../api/authApi';
import { selectIsAuthenticated } from '../store/authSlice';
import { getErrorMessage } from '../lib/getErrorMessage';
import styles from './AuthPage.module.css';

const schema = z.object({
  name: z.string().min(2, 'Informe seu nome'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter ao menos 8 caracteres'),
});

type RegisterForm = z.infer<typeof schema>;

export default function RegisterPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: zodResolver(schema) });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: RegisterForm) => {
    try {
      await registerUser(values).unwrap();
      navigate('/', { replace: true });
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
        <p className={styles.subtitle}>Crie sua conta</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && (
            <div className={styles.formError}>
              {getErrorMessage(error, 'Não foi possível criar a conta')}
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Nome
            </label>
            <input
              id="name"
              type="text"
              className={styles.input}
              autoComplete="name"
              {...register('name')}
            />
            {errors.name && (
              <span className={styles.fieldError}>{errors.name.message}</span>
            )}
          </div>

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
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <span className={styles.fieldError}>{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Criando…' : 'Criar conta'}
          </button>
        </form>

        <p className={styles.switch}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
