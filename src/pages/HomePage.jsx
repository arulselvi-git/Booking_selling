import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import BookList from '../components/BookList';

const HomePage = () => {
  const { books, loading, error, fetchBooks } = useContext(AppContext);

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome to BookStore</h1>
      <p className="text-center text-gray-600 text-xl mb-8">Browse our collection of amazing books</p>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <BookList books={books.slice(0, 12)} />
    </div>
  );
};

export default HomePage;
