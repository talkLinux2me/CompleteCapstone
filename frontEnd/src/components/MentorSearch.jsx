import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const MentorSearch = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [meetingType, setMeetingType] = useState({
    virtual: false,
    inPerson: false,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await axios.get('http://localhost:8081/user/getAllMentors');
        // if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.data;

        console.log(data)
        setMentors(data);
        setFilteredMentors(data);
      
      } catch (err) {
        console.error('Error fetching mentors:', err);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchMentors();
  }, []);

const applyFilters = () => {
    const filtered = mentors.filter((mentor) => {
        const matchesSearchTerm = mentor.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesExpertise = expertiseFilter ? mentor.expertise.includes(expertiseFilter) : true;
        const matchesExperience = experienceFilter ? mentor.yearsOfExperience >= Number(experienceFilter) : true;
        const matchesAvailability = availabilityFilter ? mentor.availability.includes(availabilityFilter) : true;
        
        const matchesMeetingType =
            (meetingType.virtual && mentor.meetingType === 'virtual') ||
            (meetingType.inPerson && mentor.meetingType === 'in-person') ||
            (!meetingType.virtual && !meetingType.inPerson);

        return matchesSearchTerm && matchesExpertise && matchesExperience && matchesAvailability && matchesMeetingType;
    });

    navigate('/searchResults', { state: { filteredMentors: filtered } });
};


  const handleReset = () => {
    setSearchTerm('');
    setExpertiseFilter('');
    setExperienceFilter('');
    setAvailabilityFilter('');
    setMeetingType({ virtual: false, inPerson: false });
    setFilteredMentors(mentors); // Reset to original list
    setHasSearched(false); // Allow all mentors to be shown again
  };

  return (
    <div className="backdrop-blur-background p-6 min-h-screen bg-[#142a45] flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-white">Find a Mentor</h2>

      {/* Search Bar Section */}
      <div className="flex flex-col md:flex-row mb-4 w-full md:justify-center">
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded w-full md:w-1/3 p-2 mb-2 md:mb-0 md:mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={applyFilters}
          className="bg-[#4f759b] text-white rounded px-4 py-2 mb-2 md:mb-0 hover:bg-[#3f6390]"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2"
        >
          Reset
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">Or filter Mentors by:</h2>

      {/* Expertise Filter */}
      <div className="mb-4 w-full md:w-1/2">
        <select
          value={expertiseFilter}
          onChange={(e) => setExpertiseFilter(e.target.value)}
          className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          <option value="">Filter by expertise</option>
          <option value="Web Development">Web Development</option>
          <option value="AI">Artificial Intelligence</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="SQL">SQL</option>
          <option value="React">React</option>

        </select>
      </div>

      {/* Experience Filter */}
      <div className="mb-4 w-full md:w-1/2">
  <select
    value={experienceFilter}
    onChange={(e) => setExperienceFilter(e.target.value)}
    className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
  >
    <option value="">Filter by years of experience</option>

    <option value="1">1+</option>
    <option value="2">2+</option>
    <option value="3">3+</option>
    <option value="4">4+</option>
    <option value="5">5+</option>
    <option value="6">6+</option>
    <option value="7">7+</option>
    <option value="8">8+</option>
    <option value="9">9+</option>
    <option value="10">10+</option>
  </select>
</div>


      {/* Availability Filter */}
      <div className="mb-4 w-full md:w-1/2">
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
       <option value="">Preferred Meeting Day</option>{" "}
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      {/* Meeting Type Filters */}
      <div className="mb-4 w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-2 text-white">Meeting Type</h2>
        <div className="flex items-center">
          <label className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={meetingType.virtual}
              onChange={(e) => setMeetingType({ ...meetingType, virtual: e.target.checked })}
              className="mr-2 h-4 w-4"
            />
            <span className="text-white">Virtual</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={meetingType.inPerson}
              onChange={(e) => setMeetingType({ ...meetingType, inPerson: e.target.checked })}
              className="mr-2 h-4 w-4"
            />
            <span className="text-white">In-Person</span>
          </label>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="bg-[#4f759b] text-white rounded px-4 py-2 w-full hover:bg-[#3f6390] focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
      >
        Apply Filters
      </button>
      </div> 
  )
    
};

export default MentorSearch;
