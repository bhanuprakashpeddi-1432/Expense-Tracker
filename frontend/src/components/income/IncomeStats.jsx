import { TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const IncomeStats = ({ incomes = [] }) => {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const monthlyIncome = incomes
    .filter(income => {
      const date = new Date(income.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, income) => sum + income.amount, 0);

  const averageIncome = incomes.length > 0 ? totalIncome / incomes.length : 0;

  const stats = [
    {
      title: 'Total Income',
      value: formatCurrency(totalIncome),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'This Month',
      value: formatCurrency(monthlyIncome),
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Average Income',
      value: formatCurrency(averageIncome),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncomeStats;
