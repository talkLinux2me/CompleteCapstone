import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const EditMenteeProfile = () => {
  const { id } = useParams();
  const [menteeData, setMenteeData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/mentee/:id`);
        setMenteeData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenteeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenteeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/user/mentee/:id`, menteeData);
      navigate(`/mentee/:id`); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Edit {menteeData.name}'s Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={menteeData.name}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={menteeData.email}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={menteeData.location}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="interests">Interests</label>
          <input
            type="text"
            name="interests"
            value={menteeData.interests.join(', ')} // Convert array to string for input
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
          <small>Separate interests with commas.</small>
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="skills">Skills</label>
          <input
            type="text"
            name="skills"
            value={menteeData.skills.join(', ')} // Convert array to string for input
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
          <small>Separate skills with commas.</small>
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="personalStatement">Personal Statement</label>
          <textarea
            name="personalStatement"
            value={menteeData.personalStatement}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>

        <button type="submit" className="bg-[#4f759b] text-white px-4 py-2 rounded hover:bg-[#3f6390] mr-2">
          Save Changes
        </button>
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleBack}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditMenteeProfile;
