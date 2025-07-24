import {
  Utensils,
  Car,
  Film,
  Zap,
  Heart,
  Briefcase,
  Laptop,
  TrendingUp,
  ShoppingBag,
  Home,
  Gamepad2,
  Shirt,
  GraduationCap,
  Coffee,
  Gift,
  Plane,
  Music,
  Camera,
  Book,
  Dumbbell,
  Baby,
  PiggyBank,
  CreditCard,
  Smartphone,
  Tag,
  DollarSign,
  Euro,
  Bitcoin,
  Wallet,
  Building,
  Store
} from 'lucide-react';

// Icon mapping for categories
export const categoryIcons = {
  // Food & Dining
  'utensils': Utensils,
  'coffee': Coffee,
  
  // Transportation
  'car': Car,
  'plane': Plane,
  
  // Entertainment
  'film': Film,
  'gamepad2': Gamepad2,
  'music': Music,
  'camera': Camera,
  
  // Utilities & Home
  'zap': Zap,
  'home': Home,
  'smartphone': Smartphone,
  
  // Health & Personal
  'heart': Heart,
  'dumbbell': Dumbbell,
  'baby': Baby,
  
  // Shopping & Personal
  'shopping-bag': ShoppingBag,
  'shirt': Shirt,
  'gift': Gift,
  
  // Education & Work
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
  'laptop': Laptop,
  'book': Book,
  
  // Finance & Investment
  'trending-up': TrendingUp,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
  'dollar-sign': DollarSign,
  'euro': Euro,
  'bitcoin': Bitcoin,
  'wallet': Wallet,
  
  // Business
  'building': Building,
  'store': Store,
  
  // Default
  'tag': Tag
};

// Get icon component by name
export const getIconComponent = (iconName) => {
  return categoryIcons[iconName] || categoryIcons['tag'];
};

// Predefined category templates with icons
export const categoryTemplates = [
  // Expense Categories
  { name: 'Food & Dining', icon: 'utensils', color: '#EF4444', type: 'expense' },
  { name: 'Transportation', icon: 'car', color: '#3B82F6', type: 'expense' },
  { name: 'Entertainment', icon: 'film', color: '#8B5CF6', type: 'expense' },
  { name: 'Utilities', icon: 'zap', color: '#F59E0B', type: 'expense' },
  { name: 'Healthcare', icon: 'heart', color: '#10B981', type: 'expense' },
  { name: 'Shopping', icon: 'shopping-bag', color: '#EC4899', type: 'expense' },
  { name: 'Education', icon: 'graduation-cap', color: '#6366F1', type: 'expense' },
  { name: 'Travel', icon: 'plane', color: '#06B6D4', type: 'expense' },
  { name: 'Fitness', icon: 'dumbbell', color: '#84CC16', type: 'expense' },
  { name: 'Personal Care', icon: 'shirt', color: '#F97316', type: 'expense' },
  
  // Income Categories
  { name: 'Salary', icon: 'briefcase', color: '#059669', type: 'income' },
  { name: 'Freelancing', icon: 'laptop', color: '#0891B2', type: 'income' },
  { name: 'Investments', icon: 'trending-up', color: '#7C3AED', type: 'income' },
  { name: 'Business', icon: 'building', color: '#1F2937', type: 'income' },
  { name: 'Rental', icon: 'home', color: '#059669', type: 'income' },
  { name: 'Gifts', icon: 'gift', color: '#DC2626', type: 'income' }
];

// Get icon options for form selection
export const getIconOptions = () => {
  return Object.keys(categoryIcons).map(iconKey => ({
    value: iconKey,
    label: iconKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    component: categoryIcons[iconKey]
  }));
};
