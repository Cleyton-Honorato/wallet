export type InvestmentMovementType = 'contribution' | 'withdrawal' | 'yield';

export interface InvestmentPosition {
  id: string;
  name: string;
  type: string;
  currentValue: number;
  updatedAt: string;
}

export interface InvestmentMovement {
  id: string;
  positionId: string;
  type: InvestmentMovementType;
  amount: number;
  date: string;
  description?: string;
}
