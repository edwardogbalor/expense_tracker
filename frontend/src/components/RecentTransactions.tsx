import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query.js";
import { formatDate } from "../utils/formatDate.js";

interface Transaction {
  _id: string;
  date: string;
  description: string;
  category: string;
  paymentType?: string;
  transactionType?: string;
  amount: number;
}

const RecentTransactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error loading transactions:', error);
    return <p>Error loading transactions</p>;
  }

  const transactions: Transaction[] = data?.transactions || [];

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow">
  <h2 className="text-lg font-bold mb-4 text-white">Recent Transactions</h2>
  <table className="min-w-full text-sm text-gray-400"> {/* 🔧 UPDATED: text-gray-400 */}
    <thead className="border-b border-gray-700">
      <tr>
        <th className="text-left py-2 font-medium text-gray-500">Date</th>           {/* 🔧 UPDATED */}
        <th className="text-left py-2 font-medium text-gray-500">Title</th>          {/* 🔧 UPDATED */}
        <th className="text-left py-2 font-medium text-gray-500">Category</th>       {/* 🔧 UPDATED */}
        <th className="text-left py-2 font-medium text-gray-500">Payment Type</th>   {/* 🔧 UPDATED */}
        <th className="text-right py-2 font-medium text-gray-500">Amount</th>        {/* 🔧 UPDATED */}
      </tr>
    </thead>
    <tbody>
      {transactions.map((txn: Transaction) => (
        <tr key={txn._id} className="border-b border-gray-800 hover:bg-[#2a2a2a]">
          <td className="py-2">{formatDate(txn.date)}</td>
          <td className="py-2">{txn.description}</td>
          <td className="py-2 capitalize">{txn.category}</td>
          <td className="py-2 capitalize">{txn.paymentType || "-"}</td>
          <td className="py-2 text-right">${txn.amount.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default RecentTransactions;
