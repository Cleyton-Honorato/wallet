export interface FixedIncome {
  id: string;
  title: string;
  amount: number;
  category: string;
  description?: string;
  receiptDay: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VariableIncome {
  id: string;
  title: string;
  estimatedAmount: number;
  actualAmount?: number;
  category: string;
  description?: string;
  month: string;
  tags?: string[];
  isReceived: boolean;
  createdAt: string;
  updatedAt: string;
}
