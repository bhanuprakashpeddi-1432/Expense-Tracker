import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import IncomeStats from '../components/income/IncomeStats';
import IncomeList from '../components/income/IncomeList';
import IncomeForm from '../components/income/IncomeForm';
import { dummyIncome, dummyCategories } from '../data/dummyData';

const Income = () => {
  const [income, setIncome] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIncome(dummyIncome);
      setCategories(dummyCategories.filter(cat => 
        ['Salary', 'Freelancing', 'Investments'].includes(cat.name)
      ));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddIncome = (incomeData) => {
    const newIncome = {
      _id: Date.now().toString(),
      ...incomeData,
      date: new Date().toISOString(),
      user: '1'
    };
    setIncome([newIncome, ...income]);
    setShowForm(false);
  };

  const handleEditIncome = (incomeData) => {
    setIncome(income.map(item => 
      item._id === editingIncome._id 
        ? { ...item, ...incomeData }
        : item
    ));
    setEditingIncome(null);
    setShowForm(false);
  };

  const handleDeleteIncome = (incomeId) => {
    setIncome(income.filter(item => item._id !== incomeId));
  };

  const openEditForm = (incomeItem) => {
    setEditingIncome(incomeItem);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingIncome(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Income</h1>
          <p className="text-gray-600 mt-2">Track and manage your income sources</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Income</span>
        </button>
      </div>

      <IncomeStats incomes={income} />

      {showForm && (
        <IncomeForm
          income={editingIncome}
          categories={categories}
          onSubmit={editingIncome ? handleEditIncome : handleAddIncome}
          onCancel={closeForm}
        />
      )}

      <IncomeList
        income={income}
        onEdit={openEditForm}
        onDelete={handleDeleteIncome}
      />
    </div>
  );
};

export default Income;
