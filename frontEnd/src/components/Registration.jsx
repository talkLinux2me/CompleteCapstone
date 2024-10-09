import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'mentee' || 'mentor',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError('');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/user/register', { 
        ...formData
      });
      console.log(response)
      setSuccess('Registration successful! Redirecting to login page...');
      localStorage.setItem("userID", response.data.id); // Store user ID
      localStorage.setItem("userRole", formData.role); // Store user role

      setTimeout(() => {
        if (response.status === 201) {
          navigate('/login');
        } 
        // else {
        //   navigate('/creatementorprofile');
        // }
        window.location.reload(); // Optional, but might not be necessary
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } 
  };

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col bg-[#142a45] items-center">
      <h1 className="text-4xl font-bold mb-6 text-white">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">I am a:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          >
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#4f759b] text-white font-semibold py-2 rounded hover:bg-[#3f6390] focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          git init
        </button>
      </form>
    </div>
  );
};

export default Registration;
