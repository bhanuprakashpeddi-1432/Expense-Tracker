import { ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/helpers';

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();

  const handleViewAllTransactions = () => {
    navigate('/expenses');
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No recent transactions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                transaction.type === 'income' 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-red-50 text-red-600'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
              
              <div>
                <p className="font-medium text-gray-900">{transaction.title}</p>
                <p className="text-sm text-gray-500">
                  {transaction.category?.name} • {formatDate(transaction.date)}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {transactions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleViewAllTransactions}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            View all transactions →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
