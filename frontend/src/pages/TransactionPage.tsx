import React from "react";
import { useState } from "react";
import TransactionForm from '../components/TransactionForm';

interface FormData {
	description: string;
	paymentType: string;
	category: string;
	amount: string;
	location: string;
	date: string;
}

const TransactionPage = () => {
	const [formData, setFormData] = useState<FormData>({
		description: "",
		paymentType: "",
		category: "",
		amount: "",
		location: "",
		date: "",
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("formData", formData);
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// if (loading) return <TransactionFormSkeleton />;

	return (
		<div className='h-screen max-w-4xl mx-auto flex flex-col items-center'>
			<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 text-white'>
				Add a new transaction
			</p>
			<TransactionForm />
		</div>
	);
};
export default TransactionPage;