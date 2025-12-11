import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BooksPage from './pages/BooksPage';
import AddBookPage from './pages/AddBookPage';
import BookDetailsPage from './pages/BookDetailsPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
