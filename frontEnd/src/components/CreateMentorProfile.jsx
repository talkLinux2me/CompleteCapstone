import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import axios from 'axios';

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const codingLanguagesOptions = [
  "JavaScript", "Python", "Java", "React", "SQL",
  "TypeScript", "C++", "Ruby", "Swift", "Go"
];

const availabilityOptions = [
  { value: 'full-time', label: 'Full-Time' },
  { value: 'part-time', label: 'Part-Time' },
  { value: 'on-demand', label: 'On-Demand' },
];

const certificationsOptions = [
  "AWS Certified Solutions Architect",
  "Certified ScrumMaster (CSM)",
  "Cisco Certified Network Associate (CCNA)",
  "CompTIA A+",
  "CompTIA Security+",
  "Google Certified Professional Cloud Architect",
  "Microsoft Certified: Azure Fundamentals",
  "Certified Information Systems Security Professional (CISSP)",
  "AWS Certified Developer",
  "PMP (Project Management Professional)",
  "Red Hat Certified Engineer (RHCE)",
  "Certified Ethical Hacker (CEH)",
  "Salesforce Certified Administrator",
  "Google Analytics Individual Qualification",
  "ITIL Foundation"
];

const CreateMentorProfile = () => {
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState({
    location: '',
    yearsOfExperience: '',
    availability: [],
    certification: '',
    interests: [],
    personalStatement: '',
    favoriteCodingLanguage: '',
    profilePic: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const mentorID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/user/${mentorID}`);
        if (!response.ok) throw new Error('Mentor profile not found');
        const data = await response.json();
        setMentorData(data);
        setIsEditing(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (mentorID) {
      fetchMentorData();
    } else {
      setLoading(false);
    }
  }, [mentorID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setMentorData({
      ...mentorData,
      profilePic: e.target.files[0],
    });
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    setMentorData((prevData) => {
      if (checked) {
        return { ...prevData, availability: [...prevData.availability, value] };
      } else {
        return { ...prevData, availability: prevData.availability.filter((item) => item !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate yearsOfExperience
    if (mentorData.yearsOfExperience < 0) {
      setError("Years of experience must be a positive number.");
      return;
    }

    const payload = {
      ...mentorData,
      interests: mentorData.interests,
    };

    try {
      const response = await axios.put(`http://localhost:8081/user/edit/${mentorID}`, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status !== 200) throw new Error('Profile update failed');

      const data = response.data;
      setMentorData(data);

      navigate("/mentees");
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
      <h1 className="text-4xl font-bold mb-6 text-[#4d7eb9]">Mentor Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="profilePic" className="block text-gray-700">Profile Picture (optional)</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="yearsOfExperience" className="block text-gray-700">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={mentorData.yearsOfExperience}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <select
            id="location"
            name="location"
            value={mentorData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Availability</label>
          <div className="mt-1 flex flex-wrap">
            {availabilityOptions.map((option) => (
              <label key={option.value} className="flex items-center mr-6 mb-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={mentorData.availability.includes(option.value)}
                  onChange={handleAvailabilityChange}
                  className="mr-2 leading-tight"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="certification" className="block text-gray-700">Certification You're Most Proud Of</label>
          <select
            id="certification"
            name="certification"
            value={mentorData.certification}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          >
            <option value="">Select a certification</option>
            {certificationsOptions.map((cert) => (
              <option key={cert} value={cert}>{cert}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="favoriteCodingLanguage" className="block text-gray-700">Your Favorite Coding Language to Share Knowledge On</label>
          <select
            id="favoriteCodingLanguage"
            name="favoriteCodingLanguage"
            value={mentorData.favoriteCodingLanguage}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
          >
            <option value="">Select a coding language</option>
            {codingLanguagesOptions.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="personalStatement" className="block text-gray-700">Personal Statement</label>
          <textarea
            id="personalStatement"
            name="personalStatement"
            value={mentorData.personalStatement}
            onChange={handleChange}
            required
            placeholder="Please provide a personal statement here. Feel free to share any additional information you'd like potential mentees to know. We encourage you to format your statement in your favorite coding language!"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
            rows="4"
          />
        </div>
        
        <button type="submit" className="bg-[#4f759b] text-white py-2 px-4 rounded hover:bg-[#3f6390] transition duration-200 ease-in-out">
          {isEditing ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default CreateMentorProfile;
