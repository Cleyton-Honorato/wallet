export interface FixedIncome {
  id: string;
  title: string;
  amount: number;
  categoryId: string;
  description?: string;
  receiptDay: number;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  /** Recebido no mês consultado (quando a lista é carregada com um mês). */
  received: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VariableIncome {
  id: string;
  title: string;
  estimatedAmount: number;
  actualAmount?: number;
  categoryId: string;
  description?: string;
  month: string;
  tags?: string[];
  isReceived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFixedIncomeRequest {
  categoryId: number;
  title: string;
  amount: number;
  description?: string;
  receiptDay: number;
  isActive?: boolean;
  startDate: string;
  endDate?: string;
}

export type UpdateFixedIncomeRequest = Partial<CreateFixedIncomeRequest>;

export interface CreateVariableIncomeRequest {
  categoryId: number;
  title: string;
  estimatedAmount: number;
  actualAmount?: number;
  description?: string;
  month: string;
  isReceived?: boolean;
  tags?: string[];
}

export type UpdateVariableIncomeRequest = Partial<CreateVariableIncomeRequest>;
