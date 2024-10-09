import React from 'react';
import { FaTwitter, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={24} />
          </a>
        </div>
        <p className="mb-2">© 2024 Tech Mentor Mentee Connect. All Rights Reserved.</p>
        <p className="text-sm">
          Developed by Jennifer Falco for PeopleShores, Accenture, and Per Scholas.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
