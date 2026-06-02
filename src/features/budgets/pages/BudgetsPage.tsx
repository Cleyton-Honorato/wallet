import { PageContainer } from '@shared/components/layout';
import { PiggyBank } from 'lucide-react';

export default function BudgetsPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <PiggyBank size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Orçamentos</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Defina e acompanhe seus orçamentos mensais</p>
      </div>
    </PageContainer>
  );
}
