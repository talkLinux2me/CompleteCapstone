import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/user/forgot-password', { email });
      setMessage(response.data.message); 
      setError(''); 
    } catch (err) {
      setError(err.message || 'Error sending reset link.');
      setMessage('');
    }
  };

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-white">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-[#4f759b] text-white font-semibold py-2 rounded hover:bg-[#3f6390] focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
