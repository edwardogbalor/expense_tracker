import { Doughnut, Line } from "react-chartjs-2";
import { 
	Chart as ChartJS, 
	ArcElement, 
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip, 
	Legend 
} from "chart.js";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { LOGOUT } from "../graphql/mutations/user.mutation";

import Cards from "../components/Cards.jsx";
import TransactionForm from "../components/TransactionForm.jsx";

import { MdLogout } from "react-icons/md";
import { lineChartData, lineChartOptions } from "../components/LineChartData.js";
import CategoryBar from "../components/CategoryBar.jsx";
import { GET_TOTAL_BALANCE } from "../graphql/queries/statistics.query.js";
import { useQuery } from "@apollo/client";
import RecentTransactions from "../components/RecentTransactions.jsx";
import { GET_REMAINING_BUDGET } from "../graphql/queries/transaction.query.js";
import { GET_MONTH_TO_DATE } from "../graphql/queries/transaction.query.js";
import { GET_NET_WORTH } from "../graphql/queries/transaction.query.js"

ChartJS.register(
	ArcElement,
	LineElement,
	CategoryScale,
	LinearScale,
	PointElement,
	Tooltip,
	Legend
);

const HomePage = () => {
	const chartData = {
		labels: ["Saving", "Expense", "Investment"],
		datasets: [
			{
				label: "%",
				data: [13, 8, 3],
				backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
				borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
				borderRadius: 30,
				spacing: 10,
				cutout: 130,
			},
		],
	};
	const { data: balanceData, loading: balanceLoading, error: balanceError } = useQuery(GET_TOTAL_BALANCE);

	const { data: budgetData, loading: budgetLoading, error: budgetError } = useQuery(GET_REMAINING_BUDGET);

	const { data: mtdData, loading: mtdLoading, error: mtdError } = useQuery(GET_MONTH_TO_DATE);

	const { data: netWorthData, loading: netWorthLoading, error: netWorthError } = useQuery(GET_NET_WORTH);

	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const handleLogout = async () => {
		try {
			await logout();
			// Clear the Apollo Client cache FROM THE DOCS
			// https://www.apollographql.com/docs/react/caching/advanced-topics/#:~:text=Resetting%20the%20cache,any%20of%20your%20active%20queries
			client.resetStore();
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error(error.message);
		}
	};

	// Handle balance query error
	if (balanceError) {
		console.error("Balance query error:", balanceError);
	}

	return (
		<div className="p-6 text-white bg-[#0d0d0d] min-h-screen">
			{/* Grid of summary cards: total balance, etc. */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				{/* Total Balance */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Total Balance</p>
					{balanceLoading ? "Loading..." : `$${balanceData?.totalBalance?.toFixed(2) || "0.00"}`}
				</div>

				{/* Remaining Budget */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Remaining Budget</p>
					<p className="text-2xl font-semibold text-white">
						{budgetLoading
							? "Loading..."
							: budgetError
							? "Error"
							: `$${budgetData?.remainingBudget?.toFixed(2) || "0.00"}`}
						</p>
				</div>

				{/* Month-to-Date */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Month-to-Date</p>
					<p className="text-2xl font-semibold text-white">
						{mtdLoading
							? "Loading..."
							: mtdError
							? "Error"
							: `$${mtdData?.monthToDate?.toFixed(2) || "0.00"}`}
					</p>
				</div>

				{/* Net Worth */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Net Worth</p>
					<p className="text-2xl font-semibold text-white">
						{netWorthLoading
							? "Loading..."
							: `$${netWorthData?.netWorth?.toFixed(2) || "0.00"}`}
					</p>
				</div>
			</div>

			{/* Chart + spending category */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-[#1a1a1a] p-4 rounded-lg">
					<Doughnut data={chartData} />
				</div>
				<div className="bg-[#1a1a1a] p-4 rounded-lg">
					<h2 className="text-lg font-bold mb-4">Account Balance</h2>
					<Line data={lineChartData} options={lineChartOptions} />
				</div>
				<div className="bg-[#1a1a1a] p-4 rounded-lg">
					<h2 className="text-lg font-bold mb-4">Spending by Category</h2>
					<CategoryBar />
				</div>

			</div>

			{/* Form + recent transactions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<TransactionForm />
				<RecentTransactions />
			</div>
		</div>
	);
};
export default HomePage;