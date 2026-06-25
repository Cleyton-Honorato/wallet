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

export interface CreateFixedExpenseRequest {
  categoryId: number;
  title: string;
  amount: number;
  description?: string;
  dueDay: number;
  isActive?: boolean;
  startDate: string;
  endDate?: string;
}

export type UpdateFixedExpenseRequest = Partial<CreateFixedExpenseRequest>;

export interface CreateVariableExpenseRequest {
  categoryId: number;
  title: string;
  estimatedAmount: number;
  actualAmount?: number;
  description?: string;
  month: string;
  isPaid?: boolean;
  tags?: string[];
}

export type UpdateVariableExpenseRequest = Partial<CreateVariableExpenseRequest>;
