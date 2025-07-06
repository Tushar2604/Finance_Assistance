export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: 'income' | 'expense';
}

export interface Budget {
  categoryId: string;
  amount: number;
  spent: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}