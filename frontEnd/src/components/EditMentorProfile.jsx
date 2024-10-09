import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const EditMentorProfile = () => {
    const { id } = useParams();
    const [mentorData, setMentorData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMentorData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/user/mentor/:id`);
                setMentorData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMentorData();
    }, [id]);

    const handleChange = (e) => {
        setMentorData({ ...mentorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/user/mentor/:id}`, mentorData);
            navigate(`/mentor/:id`);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-white">Edit {mentorData.name}'s Profile</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={mentorData.name}
                        onChange={handleChange}
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={mentorData.email}
                        onChange={handleChange}
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={mentorData.location}
                        onChange={handleChange}
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Interests:</label>
                    <input
                        type="text"
                        name="interests"
                        value={mentorData.interests.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'interests', value: e.target.value.split(', ') } })}
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
                        placeholder="Comma separated"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Skills:</label>
                    <input
                        type="text"
                        name="skills"
                        value={mentorData.skills.join(', ')}
                        onChange={(e) => handleChange({ target: { name: 'skills', value: e.target.value.split(', ') } })}
                        className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
                        placeholder="Comma separated"
                    />
                </div>
                <button className="bg-[#4f759b] text-white px-4 py-2 rounded hover:bg-[#3f6390]" type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditMentorProfile;
