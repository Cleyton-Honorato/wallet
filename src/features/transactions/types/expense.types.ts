export interface FixedExpense {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  description?: string;
  dueDay: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VariableExpense {
  id: string;
  title: string;
  estimatedAmount: number;
  actualAmount?: number;
  categoryId: string;
  description?: string;
  month: string;
  tags?: string[];
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}
