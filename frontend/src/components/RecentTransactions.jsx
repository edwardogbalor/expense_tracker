import React from 'react';

const mockTransactions = [
  { date: 'Apr 21', description: 'Target', amount: 45 },
  { date: 'Apr 20', description: 'Salary', amount: 3000 },
  { date: 'Apr 18', description: 'Electric Bill', amount: 12 },
  { date: 'Apr 16', description: 'Gas Station', amount: 35 },
];

const RecentTransactions = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="mb-4 font-semibold text-lg text-gray-700 dark:text-white">Recent Transactions</h3>
      <ul>
        {mockTransactions.map((tx, index) => (
          <li key={index} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-300">{tx.date}</span>
            <span className="text-gray-600 dark:text-gray-300">{tx.description}</span>
            <span className="font-medium text-gray-800 dark:text-white">${tx.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
