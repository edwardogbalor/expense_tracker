import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { LOGOUT } from "../graphql/mutations/user.mutation";

import Cards from "../components/Cards.jsx";
import TransactionForm from "../components/TransactionForm.jsx";

import { MdLogout } from "react-icons/md";

ChartJS.register(ArcElement, Tooltip, Legend);

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

	if (loading) return <div>Loading...</div>;

	return (
		<div className="p-6 text-white bg-[#0d0d0d] min-h-screen">
			{/* Grid of summary cards: total balance, etc. */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				{/* Total Balance */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Total Balance</p>
					<h2 className="text-2xl font-bold mt-2">$5,170.00</h2>
				</div>

				{/* Remaining Budget */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Remaining Budget</p>
					<h2 className="text-2xl font-bold mt-2">$800.00</h2>
				</div>

				{/* Month-to-Date */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Month-to-Date</p>
					<h2 className="text-2xl font-bold mt-2">$2,350.00</h2>
				</div>

				{/* Net Worth */}
				<div className="bg-[#1a1a1a] p-4 rounded-lg text-center shadow-lg">
					<p className="text-sm text-gray-400">Net Worth</p>
					<h2 className="text-2xl font-bold mt-2">$16,370.00</h2>
				</div>
			</div>

			{/* Chart + spending category */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
				<div className="bg-[#1a1a1a] p-4 rounded-lg">
					<Doughnut data={chartData} />
				</div>
				<div className="bg-[#1a1a1a] p-4 rounded-lg">
					{/* bar chart or placeholder text like: "Spending by Category" */}
				</div>
			</div>

			{/* Form + recent transactions */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<TransactionForm />
				<div className="bg-[#1a1a1a] p-4 rounded-lg">
					<h2 className="text-lg font-bold mb-2">Recent Transactions</h2>
					<Cards />
				</div>
			</div>
		</div>
	);
};
export default HomePage;