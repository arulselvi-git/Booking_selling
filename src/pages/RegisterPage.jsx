import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading, error } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      alert('Registration successful! Please login to continue.');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button type="submit" className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-green-500 hover:underline">Login here</Link></p>
      </form>
    </div>
  );
};

export default RegisterPage;
