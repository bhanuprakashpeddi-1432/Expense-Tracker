import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-gray-400 mb-4">
          <Tag className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No expenses yet</h3>
        <p className="text-gray-500">Start tracking your expenses by adding your first one.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {expenses.map((expense) => (
          <ExpenseCard 
            key={expense._id} 
            expense={expense} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Date</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <span>Category</span>
                  </div>
                </th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {expenses.map((expense) => (
                <tr key={expense._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {formatDate(expense.date)}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div>
                      <span className="font-medium text-gray-900">{expense.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {expense.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-lg font-semibold text-red-600">
                      {formatCurrency(expense.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center space-x-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Summary */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">
              Total Expenses ({expenses.length} {expenses.length === 1 ? 'item' : 'items'})
            </span>
            <span className="text-lg font-bold text-red-600">
              {formatCurrency(
                expenses.reduce((total, expense) => total + expense.amount, 0)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
