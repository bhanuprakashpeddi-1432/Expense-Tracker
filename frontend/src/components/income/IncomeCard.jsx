import { Edit2, Trash2, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';

const IncomeCard = ({ income, onEdit, onDelete }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-gray-900">{income.source}</h3>
          </div>
          
          {income.description && (
            <p className="text-sm text-gray-600 mb-2">{income.description}</p>
          )}
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(income.date)}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl font-bold text-green-600 mb-3">
            +{formatCurrency(income.amount)}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(income)}
              className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit income"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(income._id)}
              className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete income"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
