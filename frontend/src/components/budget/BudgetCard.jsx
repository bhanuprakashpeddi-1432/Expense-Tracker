import { Edit2, Trash2, Calendar, Target, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatDate, calculatePercentage } from '../../utils/helpers';

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const spentAmount = budget.spent || 0;
  const remainingAmount = budget.amount - spentAmount;
  const spentPercentage = calculatePercentage(spentAmount, budget.amount);
  
  const getProgressColor = () => {
    if (spentPercentage >= 100) return 'bg-red-500';
    if (spentPercentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusColor = () => {
    if (spentPercentage >= 100) return 'text-red-600';
    if (spentPercentage >= 80) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusIcon = () => {
    if (spentPercentage >= 100) return AlertTriangle;
    return Target;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <StatusIcon className={`h-5 w-5 ${getStatusColor()}`} />
          <h3 className="font-semibold text-gray-900">{budget.category?.name || 'Unknown Category'}</h3>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(budget)}
            className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
            title="Edit budget"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(budget._id)}
            className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded"
            title="Delete budget"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Budget Amount */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-900">{formatCurrency(budget.amount)}</div>
        <div className="text-sm text-gray-500 capitalize">{budget.period} budget</div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Spent: {formatCurrency(spentAmount)}</span>
          <span>{spentPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getProgressColor()} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(spentPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className={getStatusColor()}>
            Remaining: {formatCurrency(Math.max(remainingAmount, 0))}
          </span>
          {spentPercentage >= 100 && (
            <span className="text-red-600 font-medium">Over Budget!</span>
          )}
        </div>
      </div>

      {/* Period Info */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Calendar className="h-4 w-4" />
        <span>
          {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
        </span>
      </div>

      {/* Status Messages */}
      {spentPercentage >= 100 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">
            You've exceeded this budget by {formatCurrency(Math.abs(remainingAmount))}
          </p>
        </div>
      )}
      
      {spentPercentage >= 80 && spentPercentage < 100 && (
        <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700">
            You're close to your budget limit
          </p>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
