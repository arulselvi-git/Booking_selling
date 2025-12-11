import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, fetchOrders } = useContext(AppContext);
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadOrderCount();
  }, [user]);

  const loadOrderCount = async () => {
    const orders = await fetchOrders();
    setOrderCount(orders.length);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-md mx-auto pt-8 px-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-lg border border-blue-200">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile</h1>
          <div className="space-y-4 mb-8 text-center">
            <p className="text-lg"><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-600">{user.name}</span></p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-600">{user.email}</span></p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Role:</span> <span className="text-gray-600 capitalize">{user.role}</span></p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Total Orders:</span> <span className="text-gray-600">{orderCount}</span></p>
          </div>
          <div className="text-center">
            <button onClick={handleLogout} className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
