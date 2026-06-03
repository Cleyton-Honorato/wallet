import { PageContainer } from '@shared/components/layout';
import { Shuffle } from 'lucide-react';

export default function VariableIncomesPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <Shuffle size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Receitas Variáveis</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Entradas que mudam de valor a cada mês</p>
      </div>
    </PageContainer>
  );
}
