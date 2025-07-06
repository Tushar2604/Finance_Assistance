'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  TrendingUp, 
  PieChart, 
  Target, 
  Shield, 
  Smartphone,
  BarChart3,
  Wallet,
  Calculator,
  DollarSign,
  Eye,
  CheckCircle
} from 'lucide-react';
import FinanceTracker from '@/components/FinanceTracker';

export default function Home() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <FinanceTracker />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Wallet className="h-4 w-4 mr-2" />
            Personal Finance Made Simple
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Take Control of Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Financial Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Track expenses, manage budgets, and gain insights into your spending patterns with our comprehensive personal finance visualizer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => setShowApp(true)}
              className="px-8 py-3 text-lg"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl mb-2">Smart Analytics</CardTitle>
              <p className="text-gray-600">
                Visualize your financial data with interactive charts and gain actionable insights
              </p>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl mb-2">Budget Management</CardTitle>
              <p className="text-gray-600">
                Set monthly budgets and track your progress with real-time spending alerts
              </p>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <PieChart className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl mb-2">Category Tracking</CardTitle>
              <p className="text-gray-600">
                Organize expenses by categories and see where your money goes
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mb-16 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">Everything You Need to Manage Your Finances</CardTitle>
            <p className="text-lg text-gray-600">
              Comprehensive tools designed to help you achieve your financial goals
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transaction Management</h3>
                    <p className="text-gray-600">
                      Add, edit, and delete transactions with ease. Track income and expenses with detailed categorization and validation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Visual Analytics</h3>
                    <p className="text-gray-600">
                      Monthly expense charts, category breakdowns, and budget comparison visualizations to understand your spending patterns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Smart Budgeting</h3>
                    <p className="text-gray-600">
                      Set monthly budgets for different categories and get alerts when you're approaching your limits.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calculator className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Spending Insights</h3>
                    <p className="text-gray-600">
                      Get intelligent insights about your spending habits and receive recommendations to optimize your finances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Data Security</h3>
                    <p className="text-gray-600">
                      Your financial data is stored securely in your browser with no external servers or data sharing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Smartphone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Mobile Responsive</h3>
                    <p className="text-gray-600">
                      Access your financial dashboard from any device with our fully responsive design.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default" className="bg-blue-600">Stage 1</Badge>
                <CardTitle className="text-xl">Transaction Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Add/Edit/Delete transactions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Transaction list view</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Monthly expenses chart</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Form validation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default" className="bg-green-600">Stage 2</Badge>
                <CardTitle className="text-xl">Categories</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Predefined categories</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Category pie chart</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Dashboard with summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Recent transactions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default" className="bg-purple-600">Stage 3</Badge>
                <CardTitle className="text-xl">Budgeting</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Monthly category budgets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Budget vs actual chart</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Spending insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Budget alerts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands who have already transformed their financial lives with our intuitive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setShowApp(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                <DollarSign className="mr-2 h-5 w-5" />
                Start Tracking Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowApp(true)}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
              >
                View Features
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}