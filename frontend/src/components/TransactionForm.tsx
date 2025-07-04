import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TRANSACTION, UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation.js";
import toast from "react-hot-toast";
import { useRefetchAllStats } from "../hooks/useRefetchAllStats";

interface TransactionFormProps {
	initialValues?: {
		_id?: string;
		description: string;
		transactionType: string;
		paymentType: string;
		category: string;
		amount: number;
		location: string;
		date: string;
	};
	mode?: "add" | "edit";
	onClose?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ initialValues, mode = "add", onClose }) => {
	const [formState, setFormState] = React.useState({
		description: initialValues?.description || "",
		transactionType: initialValues?.transactionType || "",
		paymentType: initialValues?.paymentType || "",
		category: initialValues?.category || "",
		amount: initialValues?.amount?.toString() || "",
		location: initialValues?.location || "",
		date: initialValues?.date || "",
	});

	const refetchAllStats = useRefetchAllStats();
	const [createTransaction, { loading: creating }] = useMutation(CREATE_TRANSACTION, {refetchQueries: refetchAllStats});
	const [updateTransaction, { loading: updating }] = useMutation(UPDATE_TRANSACTION, {refetchQueries: refetchAllStats});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const transactionData = {
			...formState,
			amount: parseFloat(formState.amount || "0"),
			_id: initialValues?._id,
		};
		if (!transactionData.description || !transactionData.transactionType || !transactionData.paymentType || !transactionData.category || !transactionData.amount || !transactionData.date) {
			toast.error("Please fill in all required fields");
			return;
		}
		if (isNaN(transactionData.amount) || transactionData.amount <= 0) {
			toast.error("Please enter a valid amount");
			return;
		}
		try {
			if (mode === "edit" && initialValues?._id) {
				await updateTransaction({ variables: { input: { ...transactionData, transactionId: initialValues._id } } });
				toast.success("Transaction updated successfully");
			} else {
				await createTransaction({ variables: { input: transactionData } });
				toast.success("Transaction created successfully");
			}
			if (onClose) onClose();
			setFormState({ description: "", transactionType: "", paymentType: "", category: "", amount: "", location: "", date: "" });
		} catch (error) {
			toast.error((error as Error).message || "Failed to submit transaction");
		}
	};

	return (
		<form className='w-full max-w-lg flex flex-col gap-5 px-3 relative' onSubmit={handleSubmit}>
			{mode === "edit" && onClose && (
				<button type="button" onClick={onClose} className="absolute right-2 top-2 text-2xl text-gray-400 hover:text-white">×</button>
			)}
			{/* TRANSACTION */}
			<div className='flex flex-wrap'>
				<div className='w-full'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='description'
					>
						Transaction
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='description'
						name='description'
						type='text'
						required
						placeholder='Rent, Groceries, Salary, etc.'
						value={formState.description}
						onChange={handleChange}
					/>
				</div>
			</div>

			{/* TRANSACTION TYPE */}
			<div className='flex flex-wrap'>
				<div className='w-full'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='transactionType'
					>
						Transaction Type
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='transactionType'
							name='transactionType'
							required
							value={formState.transactionType}
							onChange={handleChange}
						>
							<option value="">Select transaction type</option>
							<option value="income">Income</option>
							<option value="expense">Expense</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* PAYMENT TYPE */}
			<div className='flex flex-wrap gap-3'>
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='paymentType'
					>
						Payment Type
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='paymentType'
							name='paymentType'
							required
							value={formState.paymentType}
							onChange={handleChange}
						>
							<option value="">Select payment type</option>
							<option value="card">Card</option>
							<option value="cash">Cash</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>

				{/* CATEGORY */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='category'
					>
						Category
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='category'
							name='category'
							required
							value={formState.category}
							onChange={handleChange}
						>
							<option value="">Select category</option>
							<option value="saving">Saving</option>
							<option value="investment">Investment</option>
							<option value="bills">Bills</option>
							<option value="clothing">Clothing</option>
							<option value="rent">Rent</option>
							<option value="housing">Housing</option>
							<option value="food">Food</option>
							<option value="recreation">Recreation</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>

				{/* AMOUNT */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
						Amount($)
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='amount'
						name='amount'
						type='number'
						required
						min="0.01"
						step="0.01"
						placeholder='150'
						value={formState.amount}
						onChange={handleChange}
					/>
				</div>
			</div>

			{/* LOCATION */}
			<div className='flex flex-wrap gap-3'>
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='location'
					>
						Location
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
						id='location'
						name='location'
						type='text'
						placeholder='New York'
						value={formState.location}
						onChange={handleChange}
					/>
				</div>

				{/* DATE */}
				<div className='w-full flex-1'>
					<label className='block uppercase tracking-wide text-white text-xs font-bold mb-2' htmlFor='date'>
						Date
					</label>
					<input
						type='date'
						name='date'
						id='date'
						required
						className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white'
						placeholder='Select date'
						value={formState.date}
						onChange={handleChange}
					/>
				</div>
			</div>
			{/* SUBMIT BUTTON */}
			<button
				className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-[#23272f] to-[#23272f] hover:from-gray-700 hover:to-gray-700 disabled:opacity-70 disabled:cursor-not-allowed'
				type='submit'
				disabled={creating || updating}
			>
				{mode === "edit" ? (updating ? "Updating..." : "Update Transaction") : (creating ? "Loading..." : "Add Transaction")}
			</button>
		</form>
	);
};

export default TransactionForm;
