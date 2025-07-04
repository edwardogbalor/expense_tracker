import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query.js";
import { formatDate } from "../utils/formatDate.js";
import TransactionForm from './TransactionForm';
import { DELETE_TRANSACTION } from '../graphql/mutations/transaction.mutation.js';
import toast from "react-hot-toast";
import { useRefetchAllStats } from "../hooks/useRefetchAllStats";

interface Transaction {
  _id: string;
  date: string;
  description: string;
  category: string;
  paymentType?: string;
  transactionType?: string;
  amount: number;
  location: string;
}

const RecentTransactions = () => {
  const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS);
  const refetchAllStats = useRefetchAllStats();
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, { refetchQueries: refetchAllStats });
  const [selectedTxn, setSelectedTxn] = React.useState<Transaction | null>(null);
  const [showOptionsId, setShowOptionsId] = React.useState<string | null>(null);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const popupTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [popupLockedId, setPopupLockedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (popupLockedId) {
      if (popupTimer.current) clearTimeout(popupTimer.current);
      popupTimer.current = setTimeout(() => {
        setShowOptionsId(null);
        setPopupLockedId(null);
      }, 7000);
    }
    return () => {
      if (popupTimer.current) clearTimeout(popupTimer.current);
    };
  }, [popupLockedId]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const popup = document.getElementById('txn-popup');
      if (popup && !popup.contains(e.target as Node)) {
        setShowOptionsId(null);
        setPopupLockedId(null);
      }
    }
    if (popupLockedId) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupLockedId]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error loading transactions:', error);
    return <p>Error loading transactions</p>;
  }

  const transactions: Transaction[] = data?.transactions || [];

  const handleDelete = async (txnId: string) => {
    await deleteTransaction({ variables: { transactionId: txnId } });
    toast.success("Transaction deleted successfully");
    setShowOptionsId(null);
  };

  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow relative">
      <h2 className="text-lg font-bold mb-4 text-white">Recent Transactions</h2>
      <table className="min-w-full text-sm text-gray-400">
        <thead className="border-b border-gray-700">
          <tr>
            <th className="text-left py-2 font-medium text-gray-500">Date</th>
            <th className="text-left py-2 font-medium text-gray-500">Title</th>
            <th className="text-left py-2 font-medium text-gray-500">Category</th>
            <th className="text-left py-2 font-medium text-gray-500">Payment Type</th>
            <th className="text-right py-2 font-medium text-gray-500">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn: Transaction) => (
            <tr
              key={txn._id}
              className={`border-b border-gray-800 hover:bg-[#23272f] cursor-pointer relative ${showOptionsId === txn._id ? 'bg-[#23272f]' : ''}`}
              onMouseEnter={() => {
                if (!popupLockedId) setShowOptionsId(txn._id);
              }}
              onMouseLeave={() => {
                if (!popupLockedId) setShowOptionsId(null);
              }}
              onClick={e => {
                e.stopPropagation();
                setShowOptionsId(txn._id);
                setPopupLockedId(txn._id);
              }}
            >
              <td className="py-2">{formatDate(txn.date)}</td>
              <td className="py-2">{txn.description}</td>
              <td className="py-2 capitalize">{txn.category}</td>
              <td className="py-2 capitalize">{txn.paymentType || "-"}</td>
              <td className="py-2 text-right">${txn.amount.toFixed(2)}</td>
              {showOptionsId === txn._id && (
                <td colSpan={5} className="absolute left-1/2 top-full z-20 -translate-x-1/2 mt-2" id="txn-popup">
                  <div className="flex gap-2 bg-[#23272f] border border-gray-700 rounded shadow-lg px-4 py-2">
                    <button
                      className="text-white hover:text-blue-400 px-2 py-1 rounded transition"
                      onClick={e => { e.stopPropagation(); setSelectedTxn(txn); setShowEditModal(true); setShowOptionsId(null); setPopupLockedId(null); }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white hover:text-red-400 px-2 py-1 rounded transition"
                      onClick={async e => { e.stopPropagation(); await handleDelete(txn._id); setPopupLockedId(null); }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for editing */}
      {showEditModal && selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#23272f] rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <TransactionForm
              initialValues={{
                _id: selectedTxn._id,
                description: selectedTxn.description,
                transactionType: selectedTxn.transactionType || "",
                paymentType: selectedTxn.paymentType || "",
                category: selectedTxn.category,
                amount: selectedTxn.amount,
                location: selectedTxn.location || "",
                date: selectedTxn.date,
              }}
              mode="edit"
              onClose={() => { setShowEditModal(false); setSelectedTxn(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
