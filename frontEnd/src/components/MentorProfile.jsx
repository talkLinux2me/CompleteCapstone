import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const MentorProfile = ({ registeredUsers = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [menteeData, setMenteeData] = useState([]);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/mentors/:id}`);
        if (!response.ok) throw new Error('Mentor profile not found');
        const data = await response.json();
        setMentorData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [id]);

  useEffect(() => {
    if (registeredUsers.length > 0) {
      const mentees = registeredUsers.filter(user => user.role === 'mentee');
      setMenteeData(mentees);
    }
  }, [registeredUsers]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    const filteredMentees = menteeData.filter(mentee =>
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMenteeData(filteredMentees);
    setSearchLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{mentorData.name}'s Profile</h1>
      <img src={mentorData.profilePic} alt={`${mentorData.name}'s Profile`} className="rounded-full w-32 h-32 mb-4" />

      <h2 className="text-2xl font-semibold">Details</h2>
      <p><strong>Email:</strong> {mentorData.email}</p>
      <p><strong>Location:</strong> {mentorData.location}</p>
      <p><strong>Years of Experience:</strong> {mentorData.yearsOfExperience}</p>
     

      <h2 className="text-2xl font-semibold mt-4">Expertise</h2>
      <ul className="list-disc pl-5">
        {mentorData.expertise.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Skills</h2>
      <ul className="list-disc pl-5">
        {mentorData.skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-4">Search Mentees</h2>
      <form onSubmit={handleSearch} className="mb-4 flex">
        <input
          type="text"
          placeholder="Search by mentee name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={searchLoading}
        >
          {searchLoading ? <Spinner /> : 'Search'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold">Mentees</h2>
      <ul className="list-disc pl-5">
        {menteeData.length > 0 ? (
          menteeData.map((mentee) => (
            <li key={mentee.email}>{mentee.name}</li>
          ))
        ) : (
          <li>No mentees found</li>
        )}
      </ul>

      <div className="mt-6">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => window.location.href = `mailto:${mentorData.email}`}
        >
          Contact Mentor
        </button>
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => navigate(`//editmentorprofile`)}
        >
          Edit Profile
        </button>
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default MentorProfile;
