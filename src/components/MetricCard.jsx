import React from 'react';

const MetricCard = ({ title, value, change, changeDirection, theme }) => {
  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors" style={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff' }}>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-black dark:text-white">{value}</p>
      <p className={`text-sm ${changeDirection === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {changeDirection === 'up' ? '+' : '-'} {change}% Compared to last month
      </p>
    </div>
  );
};

export default MetricCard;