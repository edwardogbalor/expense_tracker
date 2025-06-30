// src/components/CategoryBar.jsx
import React from "react";
import { useQuery } from '@apollo/client';
import { GET_CATEGORY_TOTALS } from '../graphql/queries/statistics.query';

interface CategoryTotal {
  category: string;
  percent: number;
}

const CategoryBar = () => {
  const { data, loading, error } = useQuery(GET_CATEGORY_TOTALS);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-12 animate-pulse"></div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div className="h-3 rounded-full bg-gray-700 animate-pulse" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (error) return <p className="text-red-400">Error loading data</p>;

  const categories: CategoryTotal[] = data?.categoryTotals || [];

  return (
    <div className="space-y-4">
      {categories.map((cat: CategoryTotal) => (
        <div key={cat.category}>
          <div className="flex justify-between mb-1">
            <span>{cat.category}</span>
            <span className="text-sm text-gray-400">
              {cat.percent.toFixed(2)}%
          </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-teal-400" // 🔧 optional: use dynamic color later
              style={{ width: `${Math.min(cat.percent, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;
