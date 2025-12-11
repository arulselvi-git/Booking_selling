import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setUser(res.data);
    } catch (err) {
      console.error(err);
      logout();
    }
  };

  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      console.log('Fetching books...');
      const res = await api.get('/books', { params });
      console.log('Books received:', res.data);
      setBooks(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/register', { name, email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      setError(null);
      return { success: true, shouldRedirect: false };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, shouldRedirect: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const addBook = async (bookData) => {
    try {
      setLoading(true);
      const res = await api.post('/books', bookData);
      setBooks([res.data, ...books]);
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const buyBook = async (bookId, quantity = 1, shippingAddress) => {
    try {
      setLoading(true);
      await api.post('/orders', { bookId, quantity, shippingAddress });
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders/my');
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      user, token, books, loading, error,
      login, register, logout, addBook, buyBook, fetchBooks, fetchOrders, setError
    }}>
      {children}
    </AppContext.Provider>
  );
};
