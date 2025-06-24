import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query.js";
import { formatDate } from "../utils/formatDate.js";

const RecentTransactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading transactions</p>;

  const transactions = data?.transactions || [];

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-white">Recent Transactions</h2>
      <table className="min-w-full text-white text-sm">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Title</th>
            <th className="text-left py-2">Category</th>
            <th className="text-left py-2">Payment Type</th>
            <th className="text-right py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-b border-gray-800 hover:bg-[#2a2a2a]">
              <td className="py-2">{formatDate(txn.date)}</td>
              <td className="py-2">{txn.description}</td>
              <td className="py-2">{txn.category}</td>
              <td className="py-2">{txn.paymentType}</td>
              <td className="py-2 text-right">${txn.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
