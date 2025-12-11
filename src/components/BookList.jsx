import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p className="text-center text-xl text-gray-600 py-8">No books available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
