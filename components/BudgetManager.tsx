'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Target, AlertTriangle } from 'lucide-react';
import { Budget, Transaction } from '@/types/finance';
import { defaultCategories, getBudgets, saveBudgets } from '@/lib/storage';

interface BudgetManagerProps {
  transactions: Transaction[];
  budgets: Budget[];
  onBudgetsChange: (budgets: Budget[]) => void;
}

export default function BudgetManager({ transactions, budgets, onBudgetsChange }: BudgetManagerProps) {
  const [newBudget, setNewBudget] = useState({
    categoryId: '',
    amount: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate spent amounts for each budget
  const calculateSpentAmounts = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthExpenses = transactions
      .filter(t => {
        const transactionDate = new Date(t.date);
        return t.type === 'expense' && 
               transactionDate.getMonth() === currentMonth && 
               transactionDate.getFullYear() === currentYear;
      })
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    return budgets.map(budget => {
      const categoryName = defaultCategories.find(cat => cat.id === budget.categoryId)?.name || 'Unknown';
      const spent = currentMonthExpenses[categoryName] || 0;
      
      return {
        ...budget,
        spent,
        percentage: budget.amount > 0 ? (spent / budget.amount) * 100 : 0
      };
    });
  };

  const budgetsWithSpent = calculateSpentAmounts();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newBudget.categoryId) {
      newErrors.categoryId = 'Category is required';
    }

    if (!newBudget.amount || parseFloat(newBudget.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    // Check if budget already exists for this category
    const existingBudget = budgets.find(b => b.categoryId === newBudget.categoryId);
    if (existingBudget) {
      newErrors.categoryId = 'Budget already exists for this category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddBudget = () => {
    if (validateForm()) {
      const budget: Budget = {
        categoryId: newBudget.categoryId,
        amount: parseFloat(newBudget.amount),
        spent: 0
      };

      const updatedBudgets = [...budgets, budget];
      onBudgetsChange(updatedBudgets);
      saveBudgets(updatedBudgets);
      
      setNewBudget({ categoryId: '', amount: '' });
      setErrors({});
    }
  };

  const handleDeleteBudget = (categoryId: string) => {
    const updatedBudgets = budgets.filter(b => b.categoryId !== categoryId);
    onBudgetsChange(updatedBudgets);
    saveBudgets(updatedBudgets);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAvailableCategories = () => {
    return defaultCategories.filter(cat => 
      cat.type === 'expense' && !budgets.some(b => b.categoryId === cat.id)
    );
  };

  const availableCategories = getAvailableCategories();

  return (
    <div className="space-y-6">
      {/* Add New Budget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Set New Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget-category">Category</Label>
              <Select 
                value={newBudget.categoryId} 
                onValueChange={(value) => setNewBudget(prev => ({ ...prev, categoryId: value }))}
              >
                <SelectTrigger className={errors.categoryId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <span className="flex items-center gap-2">
                        {category.icon} {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget-amount">Monthly Budget</Label>
              <Input
                id="budget-amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={newBudget.amount}
                onChange={(e) => setNewBudget(prev => ({ ...prev, amount: e.target.value }))}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleAddBudget}
                disabled={availableCategories.length === 0}
                className="w-full"
              >
                Add Budget
              </Button>
            </div>
          </div>
          
          {availableCategories.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              All expense categories already have budgets set.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5" />
            Budget Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {budgetsWithSpent.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No budgets set yet. Add your first budget to start tracking!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {budgetsWithSpent.map((budget) => {
                const category = defaultCategories.find(cat => cat.id === budget.categoryId);
                const isOverBudget = budget.spent > budget.amount;
                const isNearLimit = budget.percentage >= 80 && !isOverBudget;
                
                return (
                  <div key={budget.categoryId} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{category?.icon}</div>
                        <div>
                          <h3 className="font-semibold">{category?.name}</h3>
                          <p className="text-sm text-gray-500">Monthly Budget</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isOverBudget && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Over Budget
                          </Badge>
                        )}
                        {isNearLimit && (
                          <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Near Limit
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBudget(budget.categoryId)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
                        </span>
                        <span className={isOverBudget ? 'text-red-600' : 'text-gray-600'}>
                          {budget.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(budget.percentage, 100)} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {budget.amount - budget.spent > 0 
                            ? `${formatCurrency(budget.amount - budget.spent)} remaining`
                            : `${formatCurrency(budget.spent - budget.amount)} over budget`
                          }
                        </span>
                        <span>
                          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}