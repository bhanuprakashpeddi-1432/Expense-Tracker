import { Edit2, Trash2 } from 'lucide-react';
import { getIconComponent } from '../../utils/icons';

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const IconComponent = getIconComponent(category.icon || 'tag');
  
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: category.color || '#3B82F6' }}
          >
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
            
            <div className="flex items-center space-x-2 mb-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                category.type === 'income' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.type}
              </span>
            </div>
            
            {category.description && (
              <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-2 ml-3">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit category"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete category"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
