import { PageContainer } from '@shared/components/layout';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <BarChart3 size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Relatórios</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Análises e gráficos detalhados</p>
      </div>
    </PageContainer>
  );
}
