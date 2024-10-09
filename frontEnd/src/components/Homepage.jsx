import React from 'react';
import TypewriterEffect from './TypewriterEffect'; 

const Homepage = () => {
  return (
    <div className="backdrop-blur-background min-h-screen flex flex-col items-center p-12 bg-[#0e1c2d]">
      <h1 className="text-5xl font-bold text-center mb-9 text-[#4d7eb9]">Welcome to Tech Mentor Mentee Connect</h1>
      <p className="text-2xl text-center mb-10 text-[#8e2fc5] font-semibold hover:underline">
        Connect with experienced mentors or find eager mentees to share knowledge and skills.
      </p>
      {/* bg-gradient-to-r from-[#3a607e] to-[#5b8a9d] */}
      {/* Get Started Section */}
      <div className=" bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl mx-auto mb-6 w-full max-w-3xl">
        <h2 className="text-4xl font-semibold mb-4 text-center text-[#0e1c2d]">Get Started</h2>
        <p className="mb-6 text-[#4d7eb9] text-lg font-semibold text-center">
          Sign up today to start connecting and collaborating with mentors and mentees.
        </p>
        <div className="flex justify-center">
          <a 
            href="/register" 
            className="bg-[#8e2fc5] text-white font-semibold hover:bg-[#741e9c] transition duration-300 px-4 py-2 rounded-md shadow-lg"
          >
            Join Now
          </a>
        </div>
      </div>

      {/* For Mentors and For Mentees Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* For Mentors */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold mb-4 text-center text-[#0e1c2d]">For Mentors</h2>
          <p className="mb-6 text-[#4d7eb9] text-lg font-semibold text-center">
            Share your expertise and guide someone on their journey. Help others grow and succeed!
          </p>
          <div className="flex justify-center">
            <a 
              href="/mentees" 
              className="bg-[#8e2fc5] text-white font-semibold hover:bg-[#741e9c] transition duration-300 px-4 py-2 rounded-md shadow-lg"
            >
              Find a Mentee
            </a>
          </div>
        </div>

        {/* For Mentees */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-semibold mb-4 text-center text-[#0e1c2d]">For Mentees</h2>
          <p className="mb-6 text-[#4d7eb9] text-lg text-center font-semibold text-center">
            Find a mentor who can help you achieve your goals. Learn with personalized guidance.
          </p>
          <div className="flex justify-center">
            <a 
              href="/mentors" 
              className="bg-[#8e2fc5] text-white font-semibold hover:bg-[#741e9c] transition duration-300 px-4 py-2 rounded-md shadow-lg"
            >
              Find a Mentor
            </a>
          </div>
        </div>
      </div>



      {/* Typewriter Effect */}
      <TypewriterEffect />
    </div>
  );
};

export default Homepage;
