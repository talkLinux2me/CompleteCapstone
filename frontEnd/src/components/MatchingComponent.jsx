import React, { useEffect, useState } from 'react'
import axios from 'axios';

function MatchingComponent() {
    const [mentor, setMentor] = useState("")


const id = localStorage.getItem("userID");

    const fetchRandomMentor = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/user/match/${id}`);
            const data = await response.data
            setMentor(data);
            console.log(mentor)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchRandomMentor();
    }, []);
  return (
    <div>
        {
            mentor? <>hi</> : <>bye</>
        }
        {/* {mentor.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4 m-2 transition transform hover:scale-105" onClick={() => navigate(`/user/${user.id}`)}>
              <h3 className="text-xl font-bold text-[#4f759b]">{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Years of Experience:</strong> {user.yearsOfExperience}</p>
              <p><strong>Expertise:</strong> {user.expertise.join(', ')}</p>
              <p><strong>Availability:</strong> {user.availability.join(', ')}</p>
              <p><strong>Meeting Type:</strong> {user.meetingType}</p>

              Request to Connect Button
              <button
                onClick={() => handleRequestConnect(user)}
                className="mt-4 bg-[#4f759b] text-white rounded px-4 py-2 hover:bg-[#3f6390] transition duration-200 ease-in-out"
                aria-label="Request to connect"
              >
                Request to Connect
              </button>
            </div>
          ))} */}
    </div>  
  )
}

export default MatchingComponent
