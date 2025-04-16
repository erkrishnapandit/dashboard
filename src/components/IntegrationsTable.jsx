import React from 'react';

const IntegrationsTable = ({ integrations, theme }) => {
  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors" style={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff' }}>
      <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">List of Integration</h3>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-sm sm:text-base">
          <thead>
            <tr className="text-black dark:text-white">
              <th className="p-2">Application</th>
              <th className="p-2">Type</th>
              <th className="p-2">Rate</th>
              <th className="p-2">Profit</th>
            </tr>
          </thead>
          <tbody>
            {integrations.map((integration, index) => (
              <tr key={index} className="border-t border-gray-200 dark:border-gray-700 text-black dark:text-white">
                <td className="p-2 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {integration.name}
                </td>
                <td className="p-2">{integration.type}</td>
                <td className="p-2">{integration.rate}%</td>
                <td className="p-2">${integration.profit.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IntegrationsTable;