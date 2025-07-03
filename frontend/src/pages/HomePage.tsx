import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import LineChart from "../components/LineChartData";
import CategoryBar from "../components/CategoryBar";
import { GET_TOTAL_BALANCE } from "../graphql/queries/statistics.query.js";
import RecentTransactions from "../components/RecentTransactions";
import { GET_REMAINING_BUDGET, GET_MONTH_TO_DATE, GET_NET_WORTH } from "../graphql/queries/transaction.query.js";
import PieChart from "../components/PieChart";

const HomePage = () => {
	const { data: balanceData, loading: balanceLoading, error: balanceError } = useQuery(GET_TOTAL_BALANCE);
	const { data: budgetData, loading: budgetLoading, error: budgetError } = useQuery(GET_REMAINING_BUDGET);
	const { data: mtdData, loading: mtdLoading, error: mtdError } = useQuery(GET_MONTH_TO_DATE);
	const { data: netWorthData, loading: netWorthLoading, error: netWorthError } = useQuery(GET_NET_WORTH);
	const [logout, { loading, client }] = useMutation(LOGOUT, { refetchQueries: ["GetAuthenticatedUser"] });

	if (balanceError) console.error("Balance query error:", balanceError);

	return (
		<div className="w-full h-full flex flex-col gap-6">
			{/* Dashboard Title */}
			<h1 className="text-3xl font-bold mb-2">Dashboard</h1>
			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				<div className="bg-[#23272f] p-4 rounded-lg text-center shadow">
					<p className="text-sm text-gray-400">Total Balance</p>
					<p className="text-2xl font-semibold text-white">
						{balanceLoading ? "Loading..." : `$${balanceData?.totalBalance?.toFixed(2) || "0.00"}`}
					</p>
				</div>
				<div className="bg-[#23272f] p-4 rounded-lg text-center shadow">
					<p className="text-sm text-gray-400">Remaining Budget</p>
					<p className="text-2xl font-semibold text-white">
						{budgetLoading ? "Loading..." : budgetError ? "Error" : `$${budgetData?.remainingBudget?.toFixed(2) || "0.00"}`}
					</p>
				</div>
				<div className="bg-[#23272f] p-4 rounded-lg text-center shadow">
					<p className="text-sm text-gray-400">Month-to-Date</p>
					<p className="text-2xl font-semibold text-white">
						{mtdLoading ? "Loading..." : mtdError ? "Error" : `$${mtdData?.monthToDate?.toFixed(2) || "0.00"}`}
					</p>
				</div>
				<div className="bg-[#23272f] p-4 rounded-lg text-center shadow">
					<p className="text-sm text-gray-400">Net Worth</p>
					<p className="text-2xl font-semibold text-white">
						{netWorthLoading ? "Loading..." : `$${netWorthData?.netWorth?.toFixed(2) || "0.00"}`}
					</p>
				</div>
			</div>
			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Left: Line Chart + Recent Transactions */}
				<div className="flex flex-col gap-6">
					<div className="bg-[#23272f] p-4 rounded-lg shadow">
						<h2 className="text-lg font-bold mb-2">Account Balance</h2>
						<LineChart />
					</div>
					<RecentTransactions />
				</div>
				{/* Right: Category Bar + Pie Chart */}
				<div className="flex flex-col gap-6">
					<div className="bg-[#23272f] p-4 rounded-lg shadow">
						<h2 className="text-lg font-bold mb-2">Spending by Category</h2>
						<CategoryBar />
					</div>
					<div className="bg-[#23272f] p-4 rounded-lg shadow flex-1 flex items-center justify-center min-h-[220px]">
						<PieChart />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;