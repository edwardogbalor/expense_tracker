import React from 'react';

const categories = [
  { name: 'Food', percent: 90, color: 'bg-teal-400' },
  { name: 'Housing', percent: 50, color: 'bg-gray-400' },
  { name: 'Transport', percent: 65, color: 'bg-blue-400' },
  { name: 'Entertainment', percent: 30, color: 'bg-yellow-400' },
];

const CategoryBars = () => {
  return (
    <div className="space-y-4 w-full max-w-md">
      {categories.map((cat) => (
        <div key={cat.name}>
          <div className="flex justify-between mb-1 text-sm text-gray-600">
            <span>{cat.name}</span>
            <span>{cat.percent}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className={`${cat.color} h-2 rounded-full`}
              style={{ width: `${cat.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBars;
