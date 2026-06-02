import { PageContainer } from '@shared/components/layout';
import { Tags } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <PageContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--space-4)' }}>
        <Tags size={48} color="var(--color-primary-500)" />
        <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-semibold)' }}>Categorias</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Organize suas transações por categoria</p>
      </div>
    </PageContainer>
  );
}
