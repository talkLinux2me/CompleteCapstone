import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Use the results from the state or an empty array if none
  useEffect(() => {
    const fetchedResults = location.state?.filteredMentors || [];
    console.log(fetchedResults)
    setResults(fetchedResults);
  }, [location.state]);

  const handleRequestConnect = (user) => {
    const role = user.role === "mentor" ? "mentee" : "mentor";
    setMessage(`A request to connect has been emailed to your ${role} match: ${user.name}.`);
    setFadeOut(false);

    // Start fade-out effect after displaying the message
    setTimeout(() => {
      setFadeOut(true);
      // Clear the message after the fade-out is complete
      setTimeout(() => {
        setMessage('');
      }, 300); // Adjust this time to match the duration of the fade-out
    }, 5000); // Duration to show the message before starting fade-out
  };

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center bg-[#0e1c2d]">
      <h2 className="text-4xl font-bold mb-6 text-white">Search Results</h2>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-[#4f759b] text-white rounded px-4 py-2 mb-4 hover:bg-[#3f6390] transition duration-200 ease-in-out"
        aria-label="Go back to the previous page"
      >
        Back
      </button>

      {/* Message Display */}
      {message && (
        <p
          className={`text-white mb-4 transition-opacity duration-300 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {message}
        </p>
      )}

      {results.length === 0 ? (
        <p className="text-white">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full md:w-2/3">
          {results.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 m-2 transition transform hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/user/${user.id}`)}
            >
              <h3 className="text-xl font-bold text-[#4f759b]">{user.name}</h3>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Role:</strong> {user.role}</p>
              <p className="text-gray-700"><strong>Years of Experience:</strong> {user.yearsOfExperience}</p>
              <p className="text-gray-700"><strong>Location:</strong> {user.location}</p>
              <p className="text-gray-700"><strong>Expertise:</strong> {user.expertise.join(', ')}</p>
              <p className="text-gray-700"><strong>Availability:</strong> {user.availability.join(', ')}</p>
              <p className="text-gray-700"><strong>Meeting Type:</strong> {user.meetingType}</p>

              {/* Request to Connect Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the onClick for the card
                  handleRequestConnect(user);
                }}
                className="mt-4 bg-[#4f759b] text-white rounded px-4 py-2 hover:bg-[#3f6390] transition duration-200 ease-in-out"
                aria-label="Request to connect"
              >
                git commit -m "Request to Connect"
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
