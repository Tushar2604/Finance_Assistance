import { Transaction, Category, Budget } from '@/types/finance';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-transactions',
  BUDGETS: 'finance-budgets',
};

export const defaultCategories: Category[] = [
  { id: '1', name: 'Salary', color: '#10b981', icon: '💼', type: 'income' },
  { id: '2', name: 'Freelance', color: '#059669', icon: '💻', type: 'income' },
  { id: '3', name: 'Investments', color: '#047857', icon: '📈', type: 'income' },
  { id: '4', name: 'Food & Dining', color: '#ef4444', icon: '🍽️', type: 'expense' },
  { id: '5', name: 'Transportation', color: '#dc2626', icon: '🚗', type: 'expense' },
  { id: '6', name: 'Shopping', color: '#b91c1c', icon: '🛍️', type: 'expense' },
  { id: '7', name: 'Entertainment', color: '#991b1b', icon: '🎬', type: 'expense' },
  { id: '8', name: 'Bills & Utilities', color: '#7f1d1d', icon: '💡', type: 'expense' },
  { id: '9', name: 'Healthcare', color: '#f59e0b', icon: '🏥', type: 'expense' },
  { id: '10', name: 'Education', color: '#d97706', icon: '📚', type: 'expense' },
];

export const getTransactions = (): Transaction[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return stored ? JSON.parse(stored) : [];
};

export const saveTransactions = (transactions: Transaction[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const getBudgets = (): Budget[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return stored ? JSON.parse(stored) : [];
};

export const saveBudgets = (budgets: Budget[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};