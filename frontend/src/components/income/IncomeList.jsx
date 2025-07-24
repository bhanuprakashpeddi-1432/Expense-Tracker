import { useState } from 'react';
import { Plus } from 'lucide-react';
import IncomeCard from './IncomeCard';
import IncomeForm from './IncomeForm';

const IncomeList = ({ incomes = [], onEdit, onDelete, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleEdit = (income) => {
    setSelectedIncome(income);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedIncome(null);
    setShowForm(true);
  };

  const handleFormSubmit = (incomeData) => {
    if (selectedIncome) {
      onEdit(selectedIncome._id, incomeData);
    } else {
      onAdd(incomeData);
    }
    setShowForm(false);
    setSelectedIncome(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedIncome(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Income Transactions</h2>
        <button
          onClick={handleAdd}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Income</span>
        </button>
      </div>

      {incomes.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">No income transactions found</div>
          <button
            onClick={handleAdd}
            className="btn btn-primary"
          >
            Add Your First Income
          </button>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {incomes.map((income) => (
                  <tr key={income._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{income.source}</div>
                        {income.description && (
                          <div className="text-sm text-gray-500">{income.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      +{income.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(income.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(income)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(income._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {incomes.map((income) => (
              <IncomeCard
                key={income._id}
                income={income}
                onEdit={handleEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      )}

      {showForm && (
        <IncomeForm
          income={selectedIncome}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </>
  );
};

export default IncomeList;
