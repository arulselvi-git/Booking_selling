import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p className="mt-4 text-center text-gray-600">Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
