import React from 'react';

const RegisteredUsers = ({ registeredUsers, theme }) => {
  const percentage = (registeredUsers.premium / registeredUsers.total) * 100;

  return (
    <div className="dark:bg-gray-800 p-4 rounded-lg shadow-md transition-colors" style={{ backgroundColor: theme === 'dark' ? '#1F2937' : '#fff' }}>
      <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Registered Users</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">{registeredUsers.total.toLocaleString()}</p>
          </div>
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={theme === 'dark' ? '#4B5563' : '#e5e7eb'}
              strokeWidth="4"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-between mt-4 text-black dark:text-white text-sm sm:text-base">
        <p>Premium Users: {registeredUsers.premium.toLocaleString()}</p>
        <p>Basic Users: {registeredUsers.basic.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default RegisteredUsers;