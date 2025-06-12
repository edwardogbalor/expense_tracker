import Card from "./Card";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = () => {
	const { data, loading, error } = useQuery(GET_TRANSACTIONS);

	if (loading) {
		return (
			<div className='w-full px-10 min-h-[40vh] flex items-center justify-center'>
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (error) {
		console.error("GraphQL Error:", error);
		return (
			<div className='w-full px-10 min-h-[40vh] flex items-center justify-center'>
				<p className='text-2xl text-red-500'>Error loading transactions: {error.message}</p>
			</div>
		);
	}

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{data?.transactions?.map((transaction) => (
					<Card key={transaction._id} transaction={transaction} />
				))}
			</div>
			{data?.transactions?.length === 0 && (
				<p className='text-2xl font-bold text-center w-full'>No transaction history found.</p>
			)}
		</div>
	);
};

export default Cards;
