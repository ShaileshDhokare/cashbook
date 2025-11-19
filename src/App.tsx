import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Footer from './components/content/Footer';
import Header from './components/content/Header';
import BookDetail from './pages/BookDetail';
import BooksList from './pages/BooksList';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import PaymentModes from './pages/PaymentModes';
import Register from './pages/Register';
import { supabase } from './supabaseClient';
import { useAuthStore } from './store/authStore';

function App() {
  const navigate = useNavigate();

  const setSession = useAuthStore((state: any) => state.setSession);
  const setError = useAuthStore((state: any) => state.setError);
  const userProfile = useAuthStore((state: any) => state.user);

  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data && !error) {
      setSession(data.session);
    } else if (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userProfile) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [userProfile]);

  const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error);
    } else {
      setSession(null);
    }
  };

  return (
    <>
      <Header logoutUser={logoutUser} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/books' element={<BooksList />} />
        <Route path='/book/:id' element={<BookDetail />} />
        <Route path='/payment-modes' element={<PaymentModes />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
