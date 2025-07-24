import { Target, TrendingUp } from 'lucide-react';
import { formatCurrency, calculatePercentage } from '../../utils/helpers';

const BudgetOverview = ({ stats }) => {
  if (!stats) {
    return (
      <div className="card animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const budgetUsed = calculatePercentage(stats.budgetSpent, stats.monthlyBudget);
  const isOverBudget = stats.budgetSpent > stats.monthlyBudget;

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Budget Overview</h2>
        </div>
      </div>

      <div className="space-y-6">
        {/* Budget Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Monthly Budget</span>
            <span className="text-sm text-gray-500">{budgetUsed}% used</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                isOverBudget 
                  ? 'bg-red-500' 
                  : budgetUsed > 80 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Budget Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Budgeted</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(stats.monthlyBudget)}
            </p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Spent</p>
            <p className={`text-lg font-semibold ${
              isOverBudget ? 'text-red-600' : 'text-gray-900'
            }`}>
              {formatCurrency(stats.budgetSpent)}
            </p>
          </div>
        </div>

        {/* Remaining Budget */}
        <div className={`p-4 rounded-lg border-2 ${
          isOverBudget 
            ? 'border-red-200 bg-red-50' 
            : 'border-green-200 bg-green-50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {isOverBudget ? 'Over Budget' : 'Remaining'}
              </p>
              <p className={`text-xl font-bold ${
                isOverBudget ? 'text-red-600' : 'text-green-600'
              }`}>
                {isOverBudget ? '-' : ''}
                {formatCurrency(Math.abs(stats.budgetRemaining))}
              </p>
            </div>
            <TrendingUp className={`h-8 w-8 ${
              isOverBudget ? 'text-red-500' : 'text-green-500'
            }`} />
          </div>
        </div>

        {/* Status Message */}
        <div className="text-center">
          {isOverBudget ? (
            <p className="text-sm text-red-600">
              ⚠️ You've exceeded your monthly budget
            </p>
          ) : budgetUsed > 80 ? (
            <p className="text-sm text-yellow-600">
              ⚡ You're close to your budget limit
            </p>
          ) : (
            <p className="text-sm text-green-600">
              ✅ You're within your budget
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
