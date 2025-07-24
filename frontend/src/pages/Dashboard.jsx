import { useState, useEffect } from 'react';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import BudgetOverview from '../components/dashboard/BudgetOverview';
import { dummyDashboardStats, dummyExpenses, dummyIncome } from '../data/dummyData';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats(dummyDashboardStats);
      
      // Combine and sort recent transactions
      const allTransactions = [
        ...dummyExpenses.map(expense => ({ ...expense, type: 'expense' })),
        ...dummyIncome.map(income => ({ ...income, type: 'income' }))
      ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      
      setRecentTransactions(allTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your financial overview.</p>
      </div>

      <DashboardStats stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={recentTransactions} />
        <BudgetOverview stats={stats} />
      </div>
    </div>
  );
};

export default Dashboard;
