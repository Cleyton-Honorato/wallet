import type { Category } from '@features/categories/types/category.types';
import type { MonthlyBudget } from '@features/budgets/types/budget.types';
import type { EmergencyFundMovement, EmergencyFundSnapshot } from '@features/emergency-fund/types/emergencyFund.types';
import type { InvestmentMovement, InvestmentPosition } from '@features/investments/types/investment.types';
import type { FixedIncome, VariableIncome } from '@features/transactions/types/income.types';
import type { FixedExpense, VariableExpense } from '@features/transactions/types/expense.types';
import type { DashboardFixtures } from '@features/dashboard/types/dashboard.types';

export const categories: Category[] = [
  { id: 'cat-housing', name: 'Moradia', color: '#4f6ef7', type: 'expense' },
  { id: 'cat-food', name: 'Alimentação', color: '#22c55e', type: 'expense' },
  { id: 'cat-transport', name: 'Transporte', color: '#f59e0b', type: 'expense' },
  { id: 'cat-health', name: 'Saúde', color: '#ef4444', type: 'expense' },
  { id: 'cat-leisure', name: 'Lazer', color: '#8b5cf6', type: 'expense' },
  { id: 'cat-education', name: 'Educação', color: '#06b6d4', type: 'expense' },
  { id: 'cat-utilities', name: 'Contas', color: '#ec4899', type: 'expense' },
  { id: 'cat-salary', name: 'Salário', color: '#16a34a', type: 'income' },
  { id: 'cat-freelance', name: 'Freelance', color: '#3b82f6', type: 'income' },
];

const now = new Date().toISOString();

export const fixedIncomes: FixedIncome[] = [
  {
    id: 'fi-1',
    title: 'Salário CLT',
    amount: 8500,
    category: 'cat-salary',
    receiptDay: 5,
    isActive: true,
    startDate: '2024-01-01',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'fi-2',
    title: 'Aluguel recebido',
    amount: 1200,
    category: 'cat-freelance',
    receiptDay: 10,
    isActive: true,
    startDate: '2025-03-01',
    createdAt: now,
    updatedAt: now,
  },
];

export const variableIncomes: VariableIncome[] = [
  { id: 'vi-1', title: 'Freelance design', estimatedAmount: 2500, actualAmount: 2800, category: 'cat-freelance', month: '2026-01', isReceived: true, createdAt: now, updatedAt: now },
  { id: 'vi-2', title: 'Freelance dev', estimatedAmount: 3500, actualAmount: 3200, category: 'cat-freelance', month: '2026-02', isReceived: true, createdAt: now, updatedAt: now },
  { id: 'vi-3', title: 'Bônus trimestral', estimatedAmount: 2000, actualAmount: 2000, category: 'cat-salary', month: '2026-03', isReceived: true, createdAt: now, updatedAt: now },
  { id: 'vi-4', title: 'Freelance consultoria', estimatedAmount: 4000, actualAmount: 4500, category: 'cat-freelance', month: '2026-04', isReceived: true, createdAt: now, updatedAt: now },
  { id: 'vi-5', title: 'Venda equipamento', estimatedAmount: 800, actualAmount: 750, category: 'cat-freelance', month: '2026-05', isReceived: true, createdAt: now, updatedAt: now },
  { id: 'vi-6', title: 'Freelance projeto', estimatedAmount: 3000, category: 'cat-freelance', month: '2026-06', isReceived: false, createdAt: now, updatedAt: now },
  { id: 'vi-7', title: 'Freelance 2025', estimatedAmount: 2000, actualAmount: 2200, category: 'cat-freelance', month: '2025-11', isReceived: true, createdAt: now, updatedAt: now },
  { id: 'vi-8', title: '13º adiantamento', estimatedAmount: 4000, actualAmount: 4000, category: 'cat-salary', month: '2025-12', isReceived: true, createdAt: now, updatedAt: now },
];

export const fixedExpenses: FixedExpense[] = [
  { id: 'fe-1', title: 'Aluguel', amount: 2200, categoryId: 'cat-housing', dueDay: 5, isActive: true, startDate: '2024-01-01', createdAt: now, updatedAt: now },
  { id: 'fe-2', title: 'Condomínio', amount: 450, categoryId: 'cat-housing', dueDay: 10, isActive: true, startDate: '2024-01-01', createdAt: now, updatedAt: now },
  { id: 'fe-3', title: 'Plano de saúde', amount: 680, categoryId: 'cat-health', dueDay: 15, isActive: true, startDate: '2024-06-01', createdAt: now, updatedAt: now },
  { id: 'fe-4', title: 'Internet + streaming', amount: 189, categoryId: 'cat-utilities', dueDay: 20, isActive: true, startDate: '2024-01-01', createdAt: now, updatedAt: now },
  { id: 'fe-5', title: 'Academia', amount: 120, categoryId: 'cat-health', dueDay: 1, isActive: true, startDate: '2025-01-01', createdAt: now, updatedAt: now },
];

export const variableExpenses: VariableExpense[] = [
  { id: 've-1', title: 'Supermercado jan', estimatedAmount: 900, actualAmount: 1020, categoryId: 'cat-food', month: '2026-01', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-2', title: 'Combustível jan', estimatedAmount: 400, actualAmount: 380, categoryId: 'cat-transport', month: '2026-01', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-3', title: 'Restaurantes jan', estimatedAmount: 350, actualAmount: 420, categoryId: 'cat-food', month: '2026-01', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-4', title: 'Supermercado fev', estimatedAmount: 950, actualAmount: 880, categoryId: 'cat-food', month: '2026-02', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-5', title: 'Cinema e shows fev', estimatedAmount: 200, actualAmount: 310, categoryId: 'cat-leisure', month: '2026-02', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-6', title: 'Uber fev', estimatedAmount: 180, actualAmount: 210, categoryId: 'cat-transport', month: '2026-02', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-7', title: 'Curso online mar', estimatedAmount: 299, actualAmount: 299, categoryId: 'cat-education', month: '2026-03', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-8', title: 'Supermercado mar', estimatedAmount: 920, actualAmount: 1050, categoryId: 'cat-food', month: '2026-03', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-9', title: 'Viagem fim de semana abr', estimatedAmount: 1500, actualAmount: 1680, categoryId: 'cat-leisure', month: '2026-04', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-10', title: 'Farmácia abr', estimatedAmount: 120, actualAmount: 95, categoryId: 'cat-health', month: '2026-04', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-11', title: 'Supermercado mai', estimatedAmount: 980, actualAmount: 910, categoryId: 'cat-food', month: '2026-05', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-12', title: 'Energia elétrica mai', estimatedAmount: 280, actualAmount: 320, categoryId: 'cat-utilities', month: '2026-05', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-13', title: 'Presentes jun', estimatedAmount: 400, categoryId: 'cat-leisure', month: '2026-06', isPaid: false, createdAt: now, updatedAt: now },
  { id: 've-14', title: 'Supermercado dez 2025', estimatedAmount: 850, actualAmount: 920, categoryId: 'cat-food', month: '2025-12', isPaid: true, createdAt: now, updatedAt: now },
  { id: 've-15', title: 'IPVA 2025', estimatedAmount: 2400, actualAmount: 2400, categoryId: 'cat-transport', month: '2025-03', isPaid: true, createdAt: now, updatedAt: now },
];

export const emergencyFundSnapshot: EmergencyFundSnapshot = {
  id: 'ef-snapshot-1',
  balance: 28500,
  targetAmount: 51000,
  updatedAt: now,
};

export const emergencyFundMovements: EmergencyFundMovement[] = [
  { id: 'efm-1', type: 'deposit', amount: 2000, date: '2026-01-15', description: 'Aporte mensal' },
  { id: 'efm-2', type: 'deposit', amount: 2000, date: '2026-02-15', description: 'Aporte mensal' },
  { id: 'efm-3', type: 'deposit', amount: 2500, date: '2026-03-15', description: 'Aporte mensal' },
  { id: 'efm-4', type: 'withdrawal', amount: 1500, date: '2026-04-02', description: 'Emergência médica' },
  { id: 'efm-5', type: 'deposit', amount: 2000, date: '2026-04-20', description: 'Aporte mensal' },
  { id: 'efm-6', type: 'deposit', amount: 2000, date: '2026-05-15', description: 'Aporte mensal' },
  { id: 'efm-7', type: 'deposit', amount: 1500, date: '2025-11-10', description: 'Aporte' },
  { id: 'efm-8', type: 'deposit', amount: 3000, date: '2025-12-20', description: 'Aporte fim de ano' },
];

export const investmentPositions: InvestmentPosition[] = [
  { id: 'inv-1', name: 'Tesouro Selic 2029', type: 'Renda fixa', currentValue: 42000, updatedAt: now },
  { id: 'inv-2', name: 'ETF BOVA11', type: 'Renda variável', currentValue: 18500, updatedAt: now },
  { id: 'inv-3', name: 'CDB Liquidez', type: 'Renda fixa', currentValue: 12000, updatedAt: now },
];

export const investmentMovements: InvestmentMovement[] = [
  { id: 'invm-1', positionId: 'inv-1', type: 'contribution', amount: 1000, date: '2026-01-10' },
  { id: 'invm-2', positionId: 'inv-2', type: 'contribution', amount: 500, date: '2026-02-05' },
  { id: 'invm-3', positionId: 'inv-1', type: 'contribution', amount: 1000, date: '2026-03-10' },
  { id: 'invm-4', positionId: 'inv-3', type: 'contribution', amount: 2000, date: '2026-04-15' },
  { id: 'invm-5', positionId: 'inv-2', type: 'yield', amount: 320, date: '2026-05-01' },
  { id: 'invm-6', positionId: 'inv-1', type: 'contribution', amount: 1000, date: '2026-05-12' },
  { id: 'invm-7', positionId: 'inv-1', type: 'contribution', amount: 800, date: '2025-12-05' },
];

function buildBudget(month: string, lines: Array<{ categoryId: string; planned: number; spent: number }>): MonthlyBudget {
  const budgetLines = lines.map((l) => ({
    categoryId: l.categoryId,
    plannedAmount: l.planned,
    spentAmount: l.spent,
  }));
  const totalPlanned = budgetLines.reduce((s, l) => s + l.plannedAmount, 0);
  return {
    id: `budget-${month}`,
    month,
    totalPlanned,
    lines: budgetLines,
    createdAt: now,
    updatedAt: now,
  };
}

export const monthlyBudgets: MonthlyBudget[] = [
  buildBudget('2026-01', [
    { categoryId: 'cat-housing', planned: 2650, spent: 2720 },
    { categoryId: 'cat-food', planned: 1200, spent: 1440 },
    { categoryId: 'cat-transport', planned: 500, spent: 380 },
    { categoryId: 'cat-health', planned: 800, spent: 680 },
    { categoryId: 'cat-leisure', planned: 400, spent: 250 },
    { categoryId: 'cat-utilities', planned: 250, spent: 189 },
  ]),
  buildBudget('2026-02', [
    { categoryId: 'cat-housing', planned: 2650, spent: 2650 },
    { categoryId: 'cat-food', planned: 1200, spent: 880 },
    { categoryId: 'cat-transport', planned: 500, spent: 210 },
    { categoryId: 'cat-health', planned: 800, spent: 800 },
    { categoryId: 'cat-leisure', planned: 400, spent: 310 },
    { categoryId: 'cat-utilities', planned: 250, spent: 189 },
  ]),
  buildBudget('2026-03', [
    { categoryId: 'cat-housing', planned: 2650, spent: 2650 },
    { categoryId: 'cat-food', planned: 1200, spent: 1050 },
    { categoryId: 'cat-transport', planned: 500, spent: 350 },
    { categoryId: 'cat-health', planned: 800, spent: 680 },
    { categoryId: 'cat-education', planned: 350, spent: 299 },
    { categoryId: 'cat-leisure', planned: 400, spent: 180 },
  ]),
  buildBudget('2026-04', [
    { categoryId: 'cat-housing', planned: 2650, spent: 2650 },
    { categoryId: 'cat-food', planned: 1200, spent: 980 },
    { categoryId: 'cat-transport', planned: 500, spent: 420 },
    { categoryId: 'cat-health', planned: 800, spent: 775 },
    { categoryId: 'cat-leisure', planned: 600, spent: 1680 },
    { categoryId: 'cat-utilities', planned: 250, spent: 189 },
  ]),
  buildBudget('2026-05', [
    { categoryId: 'cat-housing', planned: 2650, spent: 2650 },
    { categoryId: 'cat-food', planned: 1200, spent: 910 },
    { categoryId: 'cat-transport', planned: 500, spent: 280 },
    { categoryId: 'cat-health', planned: 800, spent: 800 },
    { categoryId: 'cat-leisure', planned: 400, spent: 150 },
    { categoryId: 'cat-utilities', planned: 350, spent: 320 },
  ]),
  buildBudget('2026-06', [
    { categoryId: 'cat-housing', planned: 2650, spent: 1325 },
    { categoryId: 'cat-food', planned: 1200, spent: 450 },
    { categoryId: 'cat-transport', planned: 500, spent: 120 },
    { categoryId: 'cat-health', planned: 800, spent: 400 },
    { categoryId: 'cat-leisure', planned: 500, spent: 0 },
    { categoryId: 'cat-utilities', planned: 250, spent: 95 },
  ]),
];

export const dashboardFixtures: DashboardFixtures = {
  categories,
  fixedIncomes,
  variableIncomes,
  fixedExpenses,
  variableExpenses,
  emergencyFundSnapshot,
  emergencyFundMovements,
  investmentPositions,
  investmentMovements,
  monthlyBudgets,
};
