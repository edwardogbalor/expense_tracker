import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import TransactionPage from './pages/TransactionPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Header from './components/ui/Header.jsx';
import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query.js';
import { useQuery } from '@apollo/client';
import { Toaster } from 'react-hot-toast';

function App() {
  const {data, loading, error} = useQuery(GET_AUTHENTICATED_USER);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Authentication error:", error);
  }

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/transaction/:id' element={<TransactionPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
