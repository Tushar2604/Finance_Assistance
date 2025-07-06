'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Wallet, 
  Target,
  Plus,
  Settings,
  Home,
  Receipt,
  Calculator
} from 'lucide-react';
import { Transaction, Budget } from '@/types/finance';
import { getTransactions, saveTransactions, getBudgets, saveBudgets, generateId } from '@/lib/storage';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Dashboard from './Dashboard';
import Charts from './Charts';
import BudgetManager from './BudgetManager';

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setTransactions(getTransactions());
    setBudgets(getBudgets());
  }, []);

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    setShowTransactionForm(false);
  };

  const handleUpdateTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;

    const updatedTransaction: Transaction = {
      ...transactionData,
      id: editingTransaction.id,
    };

    const updatedTransactions = transactions.map(t => 
      t.id === editingTransaction.id ? updatedTransaction : t
    );

    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowTransactionForm(true);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setShowTransactionForm(false);
  };

  const handleBudgetsChange = (newBudgets: Budget[]) => {
    setBudgets(newBudgets);
  };

  // Calculate quick stats
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netWorth = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Personal Finance Tracker</h1>
          <p className="text-lg text-gray-600">
            Take control of your finances with intelligent tracking and insights
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Total Income</p>
                    <p className="text-2xl font-bold">
                      ${totalIncome.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-100" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm">Total Expenses</p>
                    <p className="text-2xl font-bold">
                      ${totalExpenses.toLocaleString()}
                    </p>
                  </div>
                  <Receipt className="h-8 w-8 text-red-100" />
                </div>
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-r ${
              netWorth >= 0 
                ? 'from-blue-500 to-blue-600' 
                : 'from-orange-500 to-orange-600'
            } text-white`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Net Worth</p>
                    <p className="text-2xl font-bold">
                      ${netWorth.toLocaleString()}
                    </p>
                  </div>
                  <Wallet className="h-8 w-8 text-blue-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Budgets
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard transactions={transactions} budgets={budgets} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">All Transactions</h2>
              <Button onClick={() => setShowTransactionForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Financial Analytics</h2>
              <Badge variant="secondary" className="text-sm">
                {transactions.length} transactions analyzed
              </Badge>
            </div>
            <Charts transactions={transactions} budgets={budgets} />
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Budget Management</h2>
              <Badge variant="secondary" className="text-sm">
                {budgets.length} budgets active
              </Badge>
            </div>
            <BudgetManager
              transactions={transactions}
              budgets={budgets}
              onBudgetsChange={handleBudgetsChange}
            />
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <div className="flex justify-center">
              <TransactionForm
                onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                editingTransaction={editingTransaction}
                onCancel={editingTransaction ? handleCancelEdit : undefined}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Transaction Form Modal */}
        {showTransactionForm && !activeTab.includes('add') && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <TransactionForm
                onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction}
                editingTransaction={editingTransaction}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}