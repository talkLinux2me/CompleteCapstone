import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  
  const userId = localStorage.getItem('userID');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/${userId}`);
        setProfile({ ...response.data, role: userRole });
        setEditedProfile({ ...response.data, role: userRole });
      } catch (error) {
        toast.error('Failed to fetch profile data');
      }
    };
    fetchProfile();
  }, [userId, userRole]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/user/${profile.id}`, editedProfile);
      setProfile(editedProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      try {
        await axios.delete(`http://localhost:8081/user/${profile.id}`);
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        toast.success('Profile deleted successfully');
        window.location.href = '/';
      } catch (error) {
        toast.error('Failed to delete profile');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    setEditedProfile((prevData) => {
      if (checked) {
        return { ...prevData, availability: [...(prevData.availability || []), value] };
      } else {
        return { ...prevData, availability: (prevData.availability || []).filter((item) => item !== value) };
      }
    });
  };

  if (!profile) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="backdrop-blur-background p-6 min-h-screen flex flex-col items-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-[#4f759b] p-4 sm:p-6">
            <h1 className="text-3xl font-bold text-white">{profile.name}'s Profile</h1>
            <p className="text-blue-200 mt-1">Registered as a {profile.role}</p>
          </div>
          <div className="p-4 sm:p-6">
            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={editedProfile.location || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yearsOfExperience">
                    Years of Experience
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="yearsOfExperience"
                    type="number"
                    name="yearsOfExperience"
                    value={editedProfile.yearsOfExperience || ''}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Availability</label>
                  <div className="mt-1 flex flex-wrap">
                    {availabilityOptions.map((option) => (
                      <label key={option.value} className="flex items-center mr-6 mb-2">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={(editedProfile.availability || []).includes(option.value)}
                          onChange={handleAvailabilityChange}
                          className="mr-2 leading-tight"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="certification">
                    Certification
                  </label>
                  <select
                    id="certification"
                    name="certification"
                    value={editedProfile.certification || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a certification</option>
                    {certificationsOptions.map((cert) => (
                      <option key={cert} value={cert}>{cert}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="favoriteCodingLanguage">
                    Favorite Coding Language
                  </label>
                  <select
                    id="favoriteCodingLanguage"
                    name="favoriteCodingLanguage"
                    value={editedProfile.favoriteCodingLanguage || ''}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a coding language</option>
                    {codingLanguagesOptions.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="bio"
                    name="bio"
                    rows="3"
                    value={editedProfile.bio || ''}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#4f759b] hover:bg-[#3f6390] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
                  <p className="text-gray-600 mt-2">{profile.bio || 'No bio available'}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
                  <p className="text-gray-600 mt-2">Email: {profile.email}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Location</h2>
                  <p className="text-gray-600 mt-2">{profile.location || 'Not specified'}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Years of Experience</h2>
                  <p className="text-gray-600 mt-2">{profile.yearsOfExperience || 'Not specified'}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Availability</h2>
                  <p className="text-gray-600 mt-2">
                    {profile.availability && profile.availability.length > 0
                      ? profile.availability.join(', ')
                      : 'Not specified'}
                  </p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Certification</h2>
                  <p className="text-gray-600 mt-2">{profile.certification || 'Not specified'}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Favorite Coding Language</h2>
                  <p className="text-gray-600 mt-2">{profile.favoriteCodingLanguage || 'Not specified'}</p>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button
                    className="bg-[#4f759b] hover:bg-[#3f6390] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleDelete}
                  >
                    Delete Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfilePage;

// // 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedProfile, setEditedProfile] = useState(null);
//   const userId = localStorage.getItem('userID');
//   const userRole = localStorage.getItem('userRole');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8081/user/${userId}`);
//         setProfile({ ...response.data, role: userRole });
//         setEditedProfile({ ...response.data, role: userRole });
//       } catch (error) {
//         toast.error('Failed to fetch profile data');
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:8081/user/${profile.id}`, editedProfile);
//       setProfile(editedProfile);
//       setIsEditing(false);
//       toast.success('Profile updated successfully');
//     } catch (error) {
//       toast.error('Failed to update profile');
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete your profile?')) {
//       try {
//         await axios.delete(`http://localhost:8081/user/${profile.id}`);
//         localStorage.removeItem('userID');
//         localStorage.removeItem('userRole');
//         toast.success('Profile deleted successfully');
//         // Redirect to home page or login page after deletion
//         window.location.href = '/';
//       } catch (error) {
//         toast.error('Failed to delete profile');
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProfile(prev => ({ ...prev, [name]: value }));
//   };

//   if (!profile) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="bg-blue-600 p-4 sm:p-6">
//             <h1 className="text-3xl font-bold text-white">{profile.name}'s Profile</h1>
//             <p className="text-blue-200 mt-1">Registered as a {profile.role}</p>
//           </div>
//           <div className="p-4 sm:p-6">
//             {isEditing ? (
//               <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                     Name
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="name"
//                     type="text"
//                     name="name"
//                     value={editedProfile.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                     Email
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={editedProfile.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
//                     Bio
//                   </label>
//                   <textarea
//                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                     id="bio"
//                     name="bio"
//                     rows="3"
//                     value={editedProfile.bio || ''}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="submit"
//                   >
//                     Save Changes
//                   </button>
//                   <button
//                     className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="button"
//                     onClick={() => setIsEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               <>
//                 <div className="mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
//                   <p className="text-gray-600 mt-2">{profile.bio || 'No bio available'}</p>
//                 </div>
//                 <div className="mb-4">
//                   <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
//                   <p className="text-gray-600 mt-2">Email: {profile.email}</p>
//                 </div>
//                 <div className="flex items-center justify-between mt-6">
//                   <button
//                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={handleEdit}
//                   >
//                     Edit Profile
//                   </button>
//                   <button
//                     className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={handleDelete}
//                   >
//                     Delete Profile
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default ProfilePage;