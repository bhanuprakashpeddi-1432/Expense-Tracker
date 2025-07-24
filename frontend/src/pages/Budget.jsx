import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import BudgetList from '../components/budget/BudgetList';
import BudgetForm from '../components/budget/BudgetForm';
import { dummyBudgets } from '../data/dummyData';



const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBudgets(dummyBudgets);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddBudget = (budgetData) => {
    const newBudget = {
      _id: Date.now().toString(),
      ...budgetData,
      spent: 0,
      user: '1'
    };
    setBudgets([newBudget, ...budgets]);
    setShowForm(false);
  };

  const handleEditBudget = (budgetData) => {
    setBudgets(budgets.map(budget => 
      budget._id === editingBudget._id 
        ? { ...budget, ...budgetData }
        : budget
    ));
    setEditingBudget(null);
    setShowForm(false);
  };

  const handleDeleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget._id !== budgetId));
  };

  const openEditForm = (budget) => {
    setEditingBudget(budget);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBudget(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget</h1>
          <p className="text-gray-600 mt-2">Set and track your monthly budgets</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Budget</span>
        </button>
      </div>

      {showForm && (
        <BudgetForm
          budget={editingBudget}
          onSubmit={editingBudget ? handleEditBudget : handleAddBudget}
          onCancel={closeForm}
        />
      )}

      <BudgetList
        budgets={budgets}
        onEdit={openEditForm}
        onDelete={handleDeleteBudget}
      />
    </div>
  );
};

export default Budget;
