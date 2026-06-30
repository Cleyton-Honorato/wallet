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

export interface EmergencyFund extends EmergencyFundSnapshot {
  movements: EmergencyFundMovement[];
}

export interface UpdateEmergencyFundRequest {
  targetAmount: number;
  balance?: number;
}

export interface AddEmergencyFundMovementRequest {
  type: EmergencyFundMovementType;
  amount: number;
  date: string;
  description?: string;
}
