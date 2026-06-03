import { PageContainer } from '@shared/components/layout';
import { Repeat } from 'lucide-react';

export default function FixedIncomesPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <Repeat size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Receitas Fixas</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Entradas recorrentes que se repetem todo mês</p>
      </div>
    </PageContainer>
  );
}
