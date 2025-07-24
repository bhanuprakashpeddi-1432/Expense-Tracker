import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">{expense.title}</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Tag className="h-4 w-4" />
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {expense.category?.name || 'Uncategorized'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(expense.date)}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-red-600 mb-3">
            {formatCurrency(expense.amount)}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(expense)}
              className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit expense"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(expense._id)}
              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete expense"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
