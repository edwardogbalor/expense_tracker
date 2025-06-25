import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
	Query: {
		transactions: async (_, __, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");
				const userId = await context.getUser()._id;

				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (err) {
				console.error("Error getting transactions:", err);
				throw new Error("Error getting transactions");
			}
		},
		transaction: async (_, { transactionId }) => {
			try {
				const transaction = await Transaction.findById(transactionId);
				return transaction;
			} catch (err) {
				console.error("Error getting transaction:", err);
				throw new Error("Error getting transaction");
			}
		},

		totalBalance: async (_, __, context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
		  
			const transactions = await Transaction.find({ userId: user._id });
		  
			const total = transactions.reduce((sum, tx) => {
			  return tx.paymentType === "income" ? sum + tx.amount : sum - tx.amount;
			}, 0);
		  
			return total;
		  },
		  categoryTotals: async (_, __, context) => {
			if (!context.getUser()) throw new Error("Not authenticated");
			const userId = context.getUser()._id;
			try {
			  const stats = await Transaction.aggregate([
				{ $match: { userId } },
				{
				  $group: {
					_id: "$category",
					totalAmount: { $sum: "$amount" },
				  },
				},
			  ]);
		  
			  const grandTotal = stats.reduce((sum, stat) => sum + stat.totalAmount, 0);

				return stats.map((stat) => ({
				category: stat._id,
				total: stat.totalAmount,
				percent: grandTotal > 0 ? Math.round((stat.totalAmount / grandTotal) * 100) : 0
				}));

			} catch (err) {
			  console.error("Error in categoryTotals resolver:", err);
			  throw new Error("Error getting category totals");
			}
		},
		categoryBreakdown: async (_, __, context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
		  
			const transactions = await Transaction.find({ userId: user._id });
		  
			const categoryTotals = {};
		  
			for (const tx of transactions) {
			  const cat = tx.category.toLowerCase();
			  categoryTotals[cat] = (categoryTotals[cat] || 0) + tx.amount;
			}
		  
			return Object.entries(categoryTotals).map(([category, total]) => ({
			  category,
			  total,
			}));
		  },
		  remainingBudget: async (_, __, context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
		  
			const transactions = await Transaction.find({ userId: user._id });
		  
			const expenses = transactions
			  .filter(tx => tx.paymentType !== "income")
			  .reduce((sum, tx) => sum + tx.amount, 0);
		  
			const SET_BUDGET = 800; // You can move this to env/config later
			return SET_BUDGET - expenses;
		  },
		  
		  monthToDate: async (_, __, context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
		  
			const transactions = await Transaction.find({ userId: user._id });
		  
			const now = new Date();
			const currentMonth = now.getMonth();
			const currentYear = now.getFullYear();
		  
			const filteredTxns = transactions.filter((tx) => {
			  const txDate = new Date(tx.date);
			  return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
			});
		  
			const total = filteredTxns.reduce((sum, tx) => {
				return tx.paymentType === "income" ? sum + tx.amount : sum - tx.amount;
			  }, 0);
			  
		  
			return total;
		  },
		  netWorth: async (_, __, context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
		  
			const transactions = await Transaction.find({ userId: user._id });
		  
			const totalBalance = transactions.reduce((sum, tx) => {
			  return tx.paymentType === "income" ? sum + tx.amount : sum - tx.amount;
			}, 0);
		  
			const ASSETS = 15000; // Fake asset value (e.g., savings, crypto, etc.)
			return totalBalance + ASSETS;
		  },

		  getBalanceHistory: async (_, __, context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
		  
			const transactions = await Transaction.find({ userId: user._id }).sort({ date: 1 });
		  
			let runningBalance = 0;
			const history = transactions.map((tx) => {
			  if (tx.paymentType.toLowerCase() === "income") {
				runningBalance += tx.amount;
			  } else {
				runningBalance -= tx.amount;
			  }
		  
			  return {
				date: tx.date,
				balance: runningBalance,
			  };
			});
		  
			return history.map((h) => ({
				date: h.date.toISOString(), // ⬅️ This fixes the "Invalid Date" issue
				balance: h.balance,
			  }));
			  
		  },
		  
		  
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.error("Error creating transaction:", err);
				throw new Error(err.message || "Error creating transaction");
			}
		},
		updateTransaction: async (_, { input }) => {
			try {
				const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
					new: true,
				});
				return updatedTransaction;
			} catch (err) {
				console.error("Error updating transaction:", err);
				throw new Error("Error updating transaction");
			}
		},
		deleteTransaction: async (_, { transactionId }) => {
			try {
				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error("Error deleting transaction");
			}
		},
	},
};

export default transactionResolver;