import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CategoryList from '../components/categories/CategoryList';
import CategoryForm from '../components/categories/CategoryForm';
import { dummyCategories } from '../data/dummyData';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories(dummyCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddCategory = (categoryData) => {
    const newCategory = {
      _id: Date.now().toString(),
      ...categoryData,
      // Ensure icon is included
      icon: categoryData.icon || 'tag'
    };
    setCategories([...categories, newCategory]);
    setShowForm(false);
  };

  const handleEditCategory = (categoryData) => {
    setCategories(categories.map(category => 
      category._id === editingCategory._id 
        ? { ...category, ...categoryData }
        : category
    ));
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category._id !== categoryId));
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCategory(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">Organize your expenses and income</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Category</span>
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
          onClose={closeForm}
        />
      )}

      <CategoryList
        categories={categories}
        onEdit={openEditForm}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
};

export default Categories;
