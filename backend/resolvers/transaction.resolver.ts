import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

// Context interface
interface Context {
	getUser: () => { _id: string };
}

// Input interface
interface TransactionInput {
	transactionId?: string;
	description: string;
	transactionType: "income" | "expense";
	paymentType: "cash" | "card" | "bank" | "e-transfer";
	category: "saving" | "expense" | "investment";
	amount: number;
	location?: string;
	date: Date;
}

const transactionResolver = {
	Query: {
		transactions: async (_: unknown, __: unknown, context: Context) => {
			if (!context.getUser()) throw new Error("Unauthorized");
			const userId = context.getUser()._id;
			return await Transaction.find({ userId });
		},

		transaction: async (_: unknown, { transactionId }: { transactionId: string }) => {
			return await Transaction.findById(transactionId);
		},

		totalBalance: async (_: unknown, __: unknown, context: Context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");
			const transactions = await Transaction.find({ userId: user._id });

			return transactions.reduce((sum, tx) =>
				tx.transactionType === "income" ? sum + tx.amount : sum - tx.amount, 0
			);
		},

		categoryTotals: async (_: unknown, __: unknown, context: Context) => {
			if (!context.getUser()) throw new Error("Not authenticated");
			const userId = context.getUser()._id;
			const stats = await Transaction.aggregate([
				{ $match: { userId } },
				{ $group: { _id: "$category", totalAmount: { $sum: "$amount" } } }
			]);

			const grandTotal = stats.reduce((sum, s) => sum + s.totalAmount, 0);
			return stats.map((s) => ({
				category: s._id,
				total: s.totalAmount,
				percent: grandTotal > 0 ? Math.round((s.totalAmount / grandTotal) * 100) : 0
			}));
		},

		categoryBreakdown: async (_: unknown, __: unknown, context: Context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");

			const transactions = await Transaction.find({ userId: user._id });
			const breakdown: Record<string, number> = {};

			for (const tx of transactions) {
				const cat = tx.category.toLowerCase();
				breakdown[cat] = (breakdown[cat] || 0) + tx.amount;
			}

			return Object.entries(breakdown).map(([category, total]) => ({ category, total }));
		},

		remainingBudget: async (_: unknown, __: unknown, context: Context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");

			const transactions = await Transaction.find({ userId: user._id });
			const expenses = transactions
				.filter(tx => tx.transactionType === "expense")
				.reduce((sum, tx) => sum + tx.amount, 0);

			const SET_BUDGET = 800;
			return SET_BUDGET - expenses;
		},

		monthToDate: async (_: unknown, __: unknown, context: Context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");

			const transactions = await Transaction.find({ userId: user._id });

			const now = new Date();
			const currentMonth = now.getMonth();
			const currentYear = now.getFullYear();

			const filtered = transactions.filter(tx => {
				const d = new Date(tx.date);
				return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
			});

			return filtered.reduce((sum, tx) =>
				tx.transactionType === "income" ? sum + tx.amount : sum - tx.amount, 0
			);
		},

		netWorth: async (_: unknown, __: unknown, context: Context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");

			const transactions = await Transaction.find({ userId: user._id });
			const total = transactions.reduce((sum, tx) =>
				tx.transactionType === "income" ? sum + tx.amount : sum - tx.amount, 0
			);

			const ASSETS = 15000;
			return total + ASSETS;
		},

		getBalanceHistory: async (_: unknown, __: unknown, context: Context) => {
			const user = context.getUser();
			if (!user) throw new Error("Not authenticated");

			const transactions = await Transaction.find({ userId: user._id }).sort({ date: 1 });

			let balance = 0;
			const history = transactions.map(tx => {
				balance += tx.transactionType === "income" ? tx.amount : -tx.amount;
				return { date: tx.date.toISOString(), balance };
			});

			return history;
		}
	},

	Mutation: {
		createTransaction: async (_: unknown, { input }: { input: TransactionInput }, context: Context) => {
			const newTx = new Transaction({ ...input, userId: context.getUser()._id });
			await newTx.save();
			return newTx;
		},

		updateTransaction: async (_: unknown, { input }: { input: TransactionInput }) => {
			return await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true });
		},

		deleteTransaction: async (_: unknown, { transactionId }: { transactionId: string }) => {
			return await Transaction.findByIdAndDelete(transactionId);
		}
	}
};

export default transactionResolver;
