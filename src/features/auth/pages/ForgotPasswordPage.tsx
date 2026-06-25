import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, Navigate } from 'react-router';
import { useAppSelector } from '@app/hooks';
import logo from '@assets/images/logo.png';
import { useForgotPasswordMutation } from '../api/authApi';
import { selectIsAuthenticated } from '../store/authSlice';
import { getErrorMessage } from '../lib/getErrorMessage';
import styles from './AuthPage.module.css';

const schema = z.object({
  email: z.string().email('E-mail inválido'),
});

type ForgotPasswordForm = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({ resolver: zodResolver(schema) });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = async (values: ForgotPasswordForm) => {
    try {
      const result = await forgotPassword(values).unwrap();
      setMessage(result.message);
      setResetToken(result.resetToken ?? null);
    } catch {
      setMessage(null);
      setResetToken(null);
    }
  };

  const handleCopy = async () => {
    if (!resetToken) return;
    await navigator.clipboard.writeText(resetToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <img src={logo} alt="Wallet" />
          <span className={styles.brandText}>Wallet</span>
        </div>
        <p className={styles.subtitle}>Recuperar senha</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && (
            <div className={styles.formError}>
              {getErrorMessage(error, 'Não foi possível processar a solicitação')}
            </div>
          )}

          {message && (
            <div className={styles.success}>{message}</div>
          )}

          {resetToken && (
            <div className={styles.tokenBox}>
              <span className={styles.tokenLabel}>
                Seu código de redefinição (válido por 1 hora):
              </span>
              <code className={styles.tokenValue}>{resetToken}</code>
              <button type="button" className={styles.copyButton} onClick={handleCopy}>
                {copied ? 'Copiado!' : 'Copiar código'}
              </button>
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

          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? 'Gerando código…' : 'Gerar código'}
          </button>
        </form>

        {resetToken && (
          <p className={styles.switch}>
            <Link to={`/reset-password?token=${encodeURIComponent(resetToken)}`}>
              Redefinir senha agora
            </Link>
          </p>
        )}

        <p className={styles.switch}>
          Lembrou a senha? <Link to="/login">Voltar ao login</Link>
        </p>
      </div>
    </div>
  );
}
