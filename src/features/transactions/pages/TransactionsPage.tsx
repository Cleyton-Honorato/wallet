import { PageContainer } from '@shared/components/layout';
import { ArrowLeftRight } from 'lucide-react';

export default function TransactionsPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <ArrowLeftRight size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Transações</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Gerencie suas receitas e despesas</p>
      </div>
    </PageContainer>
  );
}
