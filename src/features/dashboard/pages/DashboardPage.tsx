import { PageContainer } from '@shared/components/layout';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <LayoutDashboard size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Visão geral das suas finanças</p>
      </div>
    </PageContainer>
  );
}
