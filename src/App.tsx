import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/content/Footer';
import Header from './components/content/Header';
import BookDetail from './pages/BookDetail';
import BooksList from './pages/BooksList';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PaymentModes from './pages/PaymentModes';

function App() {
  return (
    <>
      <Header />
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
