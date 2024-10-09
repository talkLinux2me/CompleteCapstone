import React, { useEffect, useState } from 'react';


const App = () => {
    const [menteeData, setMenteeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenteeData = async () => {
            try {
                const response = await fetch('http://your-api-endpoint/mentee'); // Update with your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMenteeData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenteeData();
    }, []);

    const handleEdit = () => {
        // Navigate to edit profile page
    };

    const handleSearchMentors = () => {
        // Navigate to search mentors page
    };

    const handleGoHome = () => {
        // Navigate to home page
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-4">
            {menteeData ? (
                <MenteeProfile 
                    {...menteeData} 
                    onEdit={handleEdit} 
                    onSearchMentors={handleSearchMentors} 
                    onGoHome={handleGoHome} 
                />
            ) : (
                <div className="text-center">No mentee data available.</div>
            )}
        </div>
    );
};

export default App;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Spinner from './Spinner'; 

// const MenteeProfile = () => {
//   const { id } = useParams();
//   const [menteeData, setMenteeData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMenteeData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/user/mentee/:id}`);
//         if (!response.ok) throw new Error('Mentee profile not found');
//         const data = await response.json();
//         setMenteeData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenteeData();
//   }, [id]);

//   const handleBack = () => {
//     window.history.back(); 
//   };

//   if (loading) {
//     return <Spinner />; 
//   }

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{menteeData.name}'s Profile</h1>
//       <img src={menteeData.profilePic} alt={`${menteeData.name}'s Profile`} className="rounded-full w-32 h-32 mb-4" />
      
//       <h2 className="text-2xl font-semibold">Details</h2>
//       <p><strong>Email:</strong> {menteeData.email}</p>
//       <p><strong>Location:</strong> {menteeData.location}</p>
      
//       <h2 className="text-2xl font-semibold mt-4">Interests</h2>
//       <ul className="list-disc pl-5">
//         {menteeData.interests.map((interest, index) => (
//           <li key={index}>{interest}</li>
//         ))}
//       </ul>

//       <h2 className="text-2xl font-semibold mt-4">Skills</h2>
//       <ul className="list-disc pl-5">
//         {menteeData.skills.map((skill, index) => (
//           <li key={index}>{skill}</li>
//         ))}
//       </ul>

//       <h2 className="text-2xl font-semibold mt-4">Personal Statement</h2>
//       <p>{menteeData.personalStatement}</p>
//       <div className="mt-6">
//   <button 
//     className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//     onClick={() => window.location.href = `mailto:${menteeData.email}`}
//   >
//     Contact Mentee
//   </button>
//   <button 
//     className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//     onClick={handleBack}
//   >
//     Back
//   </button>
//   <button 
//     className="bg-yellow-500 text-white px-4 py-2 rounded"
//     onClick={() => navigate(`/editmenteeprofile`)}
//   >
//     Edit Profile
//   </button>
// </div>

//     </div>
//   );
// };

// export default MenteeProfile;
