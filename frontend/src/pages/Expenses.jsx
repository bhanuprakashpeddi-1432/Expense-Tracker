import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ExpenseList from '../components/expenses/ExpenseList';
import ExpenseForm from '../components/expenses/ExpenseForm';
import { dummyExpenses, dummyCategories } from '../data/dummyData';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setExpenses(dummyExpenses);
      setCategories(dummyCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddExpense = (expenseData) => {
    const newExpense = {
      _id: Date.now().toString(),
      ...expenseData,
      date: new Date().toISOString(),
      user: '1'
    };
    setExpenses([newExpense, ...expenses]);
    setShowForm(false);
  };

  const handleEditExpense = (expenseData) => {
    setExpenses(expenses.map(expense => 
      expense._id === editingExpense._id 
        ? { ...expense, ...expenseData }
        : expense
    ));
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense._id !== expenseId));
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExpense(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600 mt-2">Track and manage your expenses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {showForm && (
        <ExpenseForm
          expense={editingExpense}
          categories={categories}
          onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
          onCancel={closeForm}
        />
      )}

      <ExpenseList
        expenses={expenses}
        onEdit={openEditForm}
        onDelete={handleDeleteExpense}
      />
    </div>
  );
};

export default Expenses;
