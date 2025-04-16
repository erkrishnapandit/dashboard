import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const SalesByRegion = ({ salesByRegion, theme }) => {
  const [chartSize, setChartSize] = useState({ width: 300, height: 300, cx: 150, cy: 150, outerRadius: 100 });

  useEffect(() => {
    const updateChartSize = () => {
      const containerWidth = window.innerWidth;
      if (containerWidth < 640) {
        setChartSize({ width: 250, height: 300, cx: 125, cy: 125, outerRadius: 80 });
      } else if (containerWidth < 1024) {
        setChartSize({ width: 300, height: 300, cx: 150, cy: 150, outerRadius: 100 });
      } else {
        setChartSize({ width: 350, height: 300, cx: 175, cy: 175, outerRadius: 120 });
      }
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const data = Object.entries(salesByRegion).map(([region, value]) => ({
    region,
    value,
  }));

  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors flex justify-center" style={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff' }}>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-black dark:text-white text-center">Sales by Region</h3>
        <RadarChart
          cx={chartSize.cx}
          cy={chartSize.cy}
          outerRadius={chartSize.outerRadius}
          width={chartSize.width}
          height={chartSize.height}
          data={data}
        >
          <PolarGrid stroke={theme === 'dark' ? '#4B5563' : '#E5E7EB'} />
          <PolarAngleAxis dataKey="region" stroke={theme === 'dark' ? '#D1D5DB' : '#6B7280'} />
          <PolarRadiusAxis stroke={theme === 'dark' ? '#D1D5DB' : '#6B7280'} />
          <Radar name="Sales" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
        </RadarChart>
      </div>
    </div>
  );
};

export default SalesByRegion;