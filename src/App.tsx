import { Suspense, lazy, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/content/Footer';
import Header from './components/content/Header';
import { supabase } from './supabaseClient';
import { useAuthStore } from './store/authStore';
import ProtectedRoute from './components/ProtectedRoute';
import { Spinner } from './components/ui/spinner';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { SquarePlus } from 'lucide-react';

const BookDetail = lazy(() => import('./pages/BookDetail'));
const BooksList = lazy(() => import('./pages/BooksList'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PaymentModes = lazy(() => import('./pages/PaymentModes'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const NewExpense = lazy(() => import('./pages/NewExpense'));

function App() {
  const setSession = useAuthStore((state: any) => state.setSession);
  const setError = useAuthStore((state: any) => state.setError);

  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const fetchSession = async () => {
    setIsLoadingSession(true);
    const { data, error } = await supabase.auth.getSession();
    if (data && !error) {
      setSession(data.session);
    } else if (error) {
      setError(error);
    }
    setIsLoadingSession(false);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoadingSession(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error);
    } else {
      setSession(null);
    }
  };

  const getLoadingScreen = () => (
    <div className='flex justify-center items-center w-screen h-screen'>
      <Spinner className='size-12' />
    </div>
  );

  if (isLoadingSession) {
    return getLoadingScreen();
  }

  return (
    <>
      <Header logoutUser={logoutUser} />
      <Toaster richColors position='top-center' />
      <Suspense fallback={getLoadingScreen()}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/books' element={<BooksList />} />
            <Route path='/book/:bookId' element={<BookDetail />} />
            <Route path='/payment-modes' element={<PaymentModes />} />
            <Route path='/new-expense' element={<NewExpense />} />
          </Route>
        </Routes>
      </Suspense>
      <div className='fixed right-8 bottom-8 z-1000'>
        <Link to='/new-expense'>
          <Button className='rounded-full flex items-center gap-2 shadow-lg'>
            <SquarePlus /> New Expense
          </Button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default App;
