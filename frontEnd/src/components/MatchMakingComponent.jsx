import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchmakingComponent = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const userId = localStorage.getItem("userID");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/user/users'); 
        const users = response.data;

        // Filter users based on role and availability, meeting type, and coding language
        const filteredUsers = users.filter(user => {
          if (user.role !== userRole) {
            return false; // Match only if roles are different
          }
             // Match based on availability, coding language, and other criteria
      const matchesAvailability = user.availability.some(avail => 
        currentUser.availability.includes(avail)
      );
      const matchesLanguage = user.favoriteCodingLanguage === currentUser.favoriteCodingLanguage;

      return matchesAvailability && matchesLanguage; 
    });

        setMatches(filteredUsers);
      } catch (err) {
        setError(err.message || 'Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userRole]);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Matches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.length > 0 ? matches.map(match => (
          <div key={match.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold">{match.name}</h2>
            <p>{match.email}</p>
            <p>Availability: {match.availability.join(', ')}</p>
            <p>Favorite Language: {match.favoriteCodingLanguage}</p>
            {/* Add more fields as necessary */}
          </div>
        )) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchmakingComponent;
