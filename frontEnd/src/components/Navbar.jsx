import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import logo from "../Images/logo-removebg-preview.png";

const Navbar = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("userID");
    navigate("/");
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem("userID")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <nav className="bg-purple-800 py-2 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="M2M Logo" className="h-24 w-auto" />
            <span className="text-white text-xl font-bold ml-2 hidden sm:inline">M2M</span>
          </NavLink>
          
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">Home</NavLink>
            <NavLink to="/mentors" className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">For Mentees</NavLink>
            <NavLink to="/mentees" className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">For Mentors</NavLink>
            {loggedIn ? (
              <>
                <NavLink to="/profile" className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">Profile</NavLink>
                <button onClick={handleLogout} className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">Log Out</button>
              </>
            ) : (
              <>
                <NavLink to="/register" className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">Registration</NavLink>
                <NavLink to="/login" className="text-white hover:bg-purple-600 px-3 py-2 rounded text-lg">Login</NavLink>
              </>
            )}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-2">
            <NavLink to="/" className="block text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">Home</NavLink>
            <NavLink to="/mentors" className="block text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">For Mentees</NavLink>
            <NavLink to="/mentees" className="block text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">For Mentors</NavLink>
            {loggedIn ? (
              <>
                <NavLink to="/profile" className="block text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">Profile</NavLink>
                <button onClick={handleLogout} className="w-full text-left text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">Log Out</button>
              </>
            ) : (
              <>
                <NavLink to="/register" className="block text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">Registration</NavLink>
                <NavLink to="/login" className="block text-white hover:bg-purple-600 px-3 py-2 rounded text-sm">Login</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;