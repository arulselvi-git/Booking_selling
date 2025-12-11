import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, logout } = useContext(AppContext);

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">BookStore</Link>
        <div className="flex gap-3 items-center flex-wrap">
          <Link to="/" className="hover:text-blue-400 transition-colors px-2">Home</Link>
          <Link to="/books" className="hover:text-blue-400 transition-colors px-2">Books</Link>
          {user ? (
            <>
              <Link to="/add-book" className="hover:text-blue-400 transition-colors px-2">Add Book</Link>
              <Link to="/orders" className="hover:text-blue-400 transition-colors px-2">Orders</Link>
              <Link to="/profile" className="hover:text-blue-400 transition-colors px-2">Profile</Link>
              <span className="text-yellow-300 px-2">Welcome, {user.name}!</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition-colors font-semibold">Login</Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors font-semibold">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
