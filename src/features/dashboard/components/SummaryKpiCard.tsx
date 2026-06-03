import { Card, type CardVariant } from '@shared/components/ui/Card';
import type { ReactNode } from 'react';

interface SummaryKpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: CardVariant;
}

export function SummaryKpiCard(props: SummaryKpiCardProps) {
  return <Card {...props} />;
}
