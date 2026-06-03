export type EmergencyFundMovementType = 'deposit' | 'withdrawal';

export interface EmergencyFundSnapshot {
  id: string;
  balance: number;
  targetAmount: number;
  updatedAt: string;
}

export interface EmergencyFundMovement {
  id: string;
  type: EmergencyFundMovementType;
  amount: number;
  date: string;
  description?: string;
}
