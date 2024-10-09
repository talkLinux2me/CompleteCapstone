import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MenteeSearch() {
  const [mentees, setMentees] = useState([]);
  const [filteredMentees, setFilteredMentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("");
  const [meetingType, setMeetingType] = useState({
    virtual: false,
    inPerson: false,
  });
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchMentees = async () => {
      setLoading(true);
      // setError(null);
      try {
        const response = await axios.get(
          "http://localhost:8081/user/getAllMentees"
        );

        const data = await response.data;

        console.log(data);
        setMentees(data);
      } catch (error) {
        console.error("Error fetching mentees:", error);
        setError("Error fetching mentees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  const applyFilters = () => {
    const filtered = mentees.filter((mentee) => {

      const matchesSearchTerm = mentee.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation = locationFilter
        ? mentee.location?.toLowerCase() === locationFilter.toLowerCase()
        : true;

        const matchesExpertise = expertiseFilter
        ? mentee.expertise?.some(exp => exp.toLowerCase() === expertiseFilter.toLowerCase())
        : true;
        
      const matchesMeetingType =
        (meetingType.virtual && mentee.meetingType === "virtual") ||
        (meetingType.inPerson && mentee.meetingType === "in-person") ||
        (!meetingType.virtual && !meetingType.inPerson);

      const matchesAvailability = availabilityFilter
        ? mentee.availability?.includes(availabilityFilter)
        : true;

      return (
        matchesSearchTerm &&
        matchesLocation &&
        matchesExpertise &&
        matchesMeetingType &&
        matchesAvailability
    );
    });


    console.log(filtered , "filtered");
    setFilteredMentees(filtered)
    console.log(filteredMentees);
    navigate('/searchResults', { state: { filteredMentors: filtered }} );
  };

  const handleReset = () => {
    setSearchTerm("");
    setLocationFilter("");
    setExpertiseFilter("");
    setMeetingType({ virtual: false, inPerson: false });
    setAvailabilityFilter("");
    setFilteredMentees(mentees);
    setHasSearched(false);
  };

  return (
    <div className="backdrop-blur-background p-6 min-h-screen bg-[#142a45] flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-6 text-white">Search for Mentees</h2>

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
          aria-label="Search for mentees"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2"
          aria-label="Reset filters"
        >
          Reset
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">
        Or filter Mentees by:
      </h2>

      {/* Location Filter */}
      <div className="mb-4 w-full md:w-1/2">
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          <option value="">Filter by State</option>
          {[
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming",
          ].map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Expertise Filter */}
      <div className="mb-4 w-full md:w-1/2">
        <select
          value={expertiseFilter}
          onChange={(e) => setExpertiseFilter(e.target.value)}
          className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          <option value="">Filter by goals</option>
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

      {/* Availability Filter */}
      <div className="mb-4 w-full md:w-1/2">
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        >
          <option value="">Filter by availability</option>{" "}
          {/* allowing the mentor to have more targeted control in choices of mentees */}
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
              onChange={() =>
                setMeetingType({
                  ...meetingType,
                  virtual: !meetingType.virtual,
                })
              }
              className="mr-2 h-4 w-4"
            />
            <span className="text-white">Virtual</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={meetingType.inPerson}
              onChange={() =>
                setMeetingType({
                  ...meetingType,
                  inPerson: !meetingType.inPerson,
                })
              }
              className="mr-2 h-4 w-4"
            />
            <span className="text-white">In-Person</span>
          </label>
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="bg-[#4f759b] text-white rounded px-4 py-2 w-full hover:bg-[#3f6390] focus:outline-none focus:ring-2 focus:ring-[#4f759b]"
        aria-label="Apply filters"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default MenteeSearch;
