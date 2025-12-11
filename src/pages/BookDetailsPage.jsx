import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  if (loading) return <p className="text-center text-xl py-12">Loading...</p>;
  if (!book) return <p className="text-center text-xl py-12">Book not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={book.image} alt={book.title} className="w-48 h-64 object-cover rounded-lg shadow-md" />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-gray-800">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
        <p className="text-3xl font-bold text-green-600 mb-4">₹{book.price} per book</p>
        {book.category && <p className="text-gray-700 mb-4"><span className="font-semibold">Category:</span> {book.category}</p>}
        <p className="text-lg leading-relaxed text-gray-700 mb-6">{book.description}</p>
        
      </div>
    </div>
  );
};

export default BookDetailsPage;
