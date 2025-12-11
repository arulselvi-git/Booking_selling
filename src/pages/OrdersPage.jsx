import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { fetchOrders, loading, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-md mx-auto pt-6 px-1">
        <h1 className="text-xl font-bold mb-4 text-gray-800">My Orders</h1>
      {loading && <p className="text-center">Loading...</p>}
      {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-600 py-8">No orders yet</p>
      ) : (
        <div className="grid gap-4">
          {orders.map(order => {
            const orderDate = new Date(order.orderDate);
            const deliveryDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            
            return (
              <div key={order._id} className="bg-gradient-to-r from-green-50 to-blue-50 py-4 px-4 rounded-lg shadow-lg border border-blue-200">
                <div className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <img 
                      src={order.bookId?.image || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop'} 
                      alt={order.bookId?.title || 'Book'} 
                      className="w-36 h-48 object-cover rounded shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop';
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-black leading-tight">{order.bookId?.title || 'Unknown Book'}</h3>
                    <p className="text-base text-black">by {order.bookId?.author || 'Unknown Author'}</p>
                    <p className="text-base font-semibold text-black">Price: ₹{order.bookId?.price || 0}</p>
                    
                    <div className="text-sm space-y-1 text-black">
                      <p><span className="font-semibold">Quantity:</span> {order.quantity}</p>
                      <p><span className="font-semibold">Total:</span> ₹{order.totalAmount}</p>
                      <p><span className="font-semibold">Order Date:</span> {orderDate.toLocaleDateString()}</p>
                      <p><span className="font-semibold">Delivery:</span> {deliveryDate.toLocaleDateString()}</p>
                      <p><span className="font-semibold">Status:</span> <span className="capitalize text-black font-semibold">{order.status}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default OrdersPage;