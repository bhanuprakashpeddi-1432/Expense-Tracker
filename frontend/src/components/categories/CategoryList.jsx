import { useState } from 'react';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';

const CategoryList = ({ categories = [], onEdit, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleFormSubmit = (categoryData) => {
    onEdit(selectedCategory._id, categoryData);
    setShowForm(false);
    setSelectedCategory(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCategory(null);
  };

  return (
    <>
      {categories.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 mb-4">No categories found</div>
          <p className="text-sm text-gray-400">Use the "Add Category" button above to create your first category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CategoryForm
          category={selectedCategory}
          onSubmit={handleFormSubmit}
          onClose={handleFormClose}
        />
      )}
    </>
  );
};

export default CategoryList;
