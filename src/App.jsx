import React, { useEffect, useState } from 'react';
import MetricCard from './components/MetricCard.jsx';
import SalesChart from './components/SalesChart.jsx';
import SalesByRegion from './components/SalesByRegion.jsx';
import RegisteredUsers from './components/RegisteredUsers.jsx';
import IntegrationsTable from './components/IntegrationsTable.jsx';
import dashboardData from './assets/data/dashboardData.json';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    setData(dashboardData.dashboard);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  if (!data) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className={`w-full min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Dashboard</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Income"
            value={`$${data.totalIncome.value.toLocaleString()}`}
            change={data.totalIncome.change}
            changeDirection={data.totalIncome.changeDirection}
            theme={theme}
          />
          <MetricCard
            title="Profit"
            value={`$${data.profit.value.toLocaleString()}`}
            change={data.profit.change}
            changeDirection={data.profit.changeDirection}
            theme={theme}
          />
          <MetricCard
            title="Total Views"
            value={data.totalViews.value.toLocaleString()}
            change={data.totalViews.change}
            changeDirection={data.totalViews.changeDirection}
            theme={theme}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${data.conversionRate.value}%`}
            change={data.conversionRate.change}
            changeDirection={data.conversionRate.changeDirection}
            theme={theme}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <SalesChart salesData={data.salesData} theme={theme} />
          </div>
          <div className="md:col-span-1">
            <SalesByRegion salesByRegion={data.salesByRegion} theme={theme} />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <RegisteredUsers registeredUsers={data.registeredUsers} theme={theme} />
          <IntegrationsTable integrations={data.integrations} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default App;