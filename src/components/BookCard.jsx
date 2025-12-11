import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const BookCard = ({ book }) => {
  const { user, buyBook } = useContext(AppContext);
  const navigate = useNavigate();
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });

  const handleBuy = async () => {
    if (!user) {
      alert('Please login to buy books');
      navigate('/login');
      return;
    }
    setShowBuyModal(true);
  };

  const handleBuyClick = () => {
    setShowAddressForm(true);
  };

  const handleConfirmOrder = async () => {
    if (!address.name || !address.phone || !address.address || !address.city || !address.pincode) {
      alert('Please fill all address fields');
      return;
    }
    const totalAmount = book.price * quantity;
    const success = await buyBook(book._id, quantity, address);
    if (success) {
      alert(`Order Confirmed Successfully!\n\nTotal Amount: ₹${totalAmount}\nQuantity: ${quantity} books\n\nYour order will be delivered to:\n${address.name}\n${address.address}, ${address.city} - ${address.pincode}`);
      setShowBuyModal(false);
      setShowAddressForm(false);
      navigate('/orders');
    }
  };

  return (
    <>
      <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col h-full">
        <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{book.title}</h3>
          <p className="text-gray-600 mb-2">by {book.author}</p>
          <p className="text-2xl font-bold text-green-600 my-2">₹{book.price}</p>
          <p className="text-gray-700 text-sm mb-4 flex-grow">{book.description.substring(0, 80)}...</p>
          <div className="flex gap-2 mt-auto">
            <button onClick={() => navigate(`/books/${book._id}`)} className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded transition-all">
              Details
            </button>
            <button onClick={handleBuy} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-4 rounded transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {showBuyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-end mb-4">
                <button onClick={() => setShowBuyModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img src={book.image} alt={book.title} className="w-48 h-64 object-cover rounded-lg shadow-md" />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2 text-gray-800">{book.title}</h1>
                  <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-2xl font-bold text-green-600 mb-2">₹{book.price} per book</p>
                  {book.category && <p className="text-gray-700 mb-3"><span className="font-semibold">Category:</span> {book.category}</p>}
                  <p className="text-sm leading-relaxed text-gray-700 mb-4">{book.description}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-lg font-semibold mb-3 text-gray-700">Select Quantity:</label>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-lg text-lg font-bold">-</button>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center text-lg font-bold border-2 border-gray-300 rounded-lg p-1" min="1" />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded-lg text-lg font-bold">+</button>
                  </div>
                  <div className="text-xl font-bold text-gray-800 text-center">
                    Total Amount: <span className="text-green-600">₹{book.price * quantity}</span>
                  </div>
                </div>
                
                <button onClick={handleBuyClick} className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
                  Buy Now - ₹{book.price * quantity}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddressForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Your Order</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-2">Order Summary:</h3>
              <p className="text-gray-700"><span className="font-semibold">Book:</span> {book.title}</p>
              <p className="text-gray-700"><span className="font-semibold">Quantity:</span> {quantity} books</p>
              <p className="text-gray-700"><span className="font-semibold">Price per book:</span> ₹{book.price}</p>
              <p className="text-xl font-bold text-green-600 mt-2">Total Amount: ₹{book.price * quantity}</p>
            </div>

            <h3 className="text-xl font-bold mb-4 text-gray-800">Shipping Address:</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <input type="tel" placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <textarea placeholder="Complete Address" value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24" required />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <input type="text" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setShowAddressForm(false)} className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors">
                Cancel
              </button>
              <button onClick={handleConfirmOrder} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
