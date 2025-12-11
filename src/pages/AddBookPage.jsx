import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const { addBook, loading, error, user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    const success = await addBook({ title, author, price: parseFloat(price), description, category, image });
    if (success) {
      alert('Book added successfully!');
      navigate('/books');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Book</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        <input type="url" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-24" required />
        <button type="submit" className="w-full p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
