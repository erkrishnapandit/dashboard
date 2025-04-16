import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesChart = ({ salesData, theme }) => {
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const updateChartWidth = () => {
      const containerWidth = window.innerWidth;
      setChartWidth(Math.min(containerWidth * 0.66 - 40, 1200));
    };

    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () => window.removeEventListener('resize', updateChartWidth);
  }, []);

  const data = salesData.totalRevenue.map((item, index) => ({
    month: item.month,
    TotalRevenue: item.value,
    TotalTarget: salesData.totalTarget[index].value,
  }));

  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors" style={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff' }}>
      <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Sales</h3>
      <div className="w-full overflow-x-auto">
        <LineChart
          width={chartWidth}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
          <XAxis dataKey="month" stroke={theme === 'dark' ? '#D1D5DB' : '#6B7280'} />
          <YAxis stroke={theme === 'dark' ? '#D1D5DB' : '#6B7280'} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
              color: theme === 'dark' ? '#FFFFFF' : '#000000',
              border: 'none',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="TotalRevenue" stroke="#3b82f6" />
          <Line type="monotone" dataKey="TotalTarget" stroke="#f97316" />
        </LineChart>
      </div>
    </div>
  );
};

export default SalesChart;