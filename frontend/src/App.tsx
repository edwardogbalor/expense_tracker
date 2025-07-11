import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";

function App() {
	const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

	if (loading) return null;

	return (
		<>
			<Routes>
				{/* Public routes (no sidebar) */}
				<Route path="/login" element={!data.authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/signup" element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />} />

				{/* Protected routes (with sidebar) */}
				<Route
					path="*"
					element={
						<Layout>
							<Routes>
								<Route path='/' element={data.authUser ? <HomePage /> : <Navigate to='/login' />} />
								<Route
									path='/transaction/:id'
									element={data.authUser ? <TransactionPage /> : <Navigate to='/login' />}
								/>
								<Route path='*' element={<NotFoundPage />} />
							</Routes>
						</Layout>
					}
				/>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
