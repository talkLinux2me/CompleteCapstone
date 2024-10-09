import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';  // Importing the Navbar component
import HomePage from './Homepage'; // Home page component
import Login from './Login';        // Login component
import MenteeProfile from './MenteeProfile'; // Mentee profile component
import MenteeSearch from './MenteeSearch';   // Mentee search component
import MentorProfile from './MentorProfile'; // Mentor profile component
import MentorSearch from './MentorSearch';   // Mentor search component
import Profile from './Profile';             // User profile component
import Registration from './Registration';  // Registration component
import CreateMenteeProfile from './CreateMenteeProfile'; //Creating Mentee Profile
import CreateMentorProfile from './CreateMentorProfile';
import InspirationalMessages from './InspirationalMessages';
import TypewriterEffect from './TypewriterEffect';
import MatchingComponent from './MatchingComponent';
import EditMenteeProfile from './EditMenteeProfile';
import EditMentorProfile from './EditMentorProfile';
import SearchResults from './SearchResults';
import ForgotPassword from './ForgotPassword';
import Footer from './Footer';
import UserProfile from './UserProfile';
import MatchMakingComponent from './MatchMakingComponent';


const AppRoutes = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentees" element={<MenteeSearch />} />
        <Route path="/mentee/:id" element={<MenteeProfile />} />
        <Route path="/mentors" element={<MentorSearch />} />
        <Route path="/mentor/:id" element={<MentorProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/creatementeeprofile" element={<CreateMenteeProfile/>} />
        <Route path="/creatementorprofile" element={<CreateMentorProfile/>} />
        <Route path="/inspirationalmessages" element={<InspirationalMessages/>} />
        <Route path="/typewritereffect" element={<TypewriterEffect/>} />
        <Route path="/matchingcomponent" element={<MatchingComponent/>} />
        <Route path="/editmenteeprofile" element={<EditMenteeProfile/>} />
        <Route path="/editmentorprofile" element={<EditMentorProfile/>} />
        <Route path="/searchResults" element={<SearchResults/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />  
        <Route path="/footer" element={<Footer/>} /> 
        <Route path="/user/:id" element={<UserProfile/>}/>
      
        <Route path="/matchmakingcomponent" element={<MatchMakingComponent/>}/>
      </Routes>
    
    </>
  );
};

export default AppRoutes;

