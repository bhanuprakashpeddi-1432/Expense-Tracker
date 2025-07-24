import { useState } from 'react';
import { Plus } from 'lucide-react';
import BudgetCard from './BudgetCard';
import BudgetForm from './BudgetForm';

const BudgetList = ({ budgets = [], onEdit, onDelete, onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleEdit = (budget) => {
    setSelectedBudget(budget);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedBudget(null);
    setShowForm(true);
  };

  const handleFormSubmit = (budgetData) => {
    if (selectedBudget) {
      onEdit(selectedBudget._id, budgetData);
    } else {
      onAdd(budgetData);
    }
    setShowForm(false);
    setSelectedBudget(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedBudget(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
        <button
          onClick={handleAdd}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create Budget</span>
        </button>
      </div>

      {budgets.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">No budgets created yet</div>
          <button
            onClick={handleAdd}
            className="btn btn-primary"
          >
            Create Your First Budget
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget._id}
              budget={budget}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <BudgetForm
          budget={selectedBudget}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </>
  );
};

export default BudgetList;
