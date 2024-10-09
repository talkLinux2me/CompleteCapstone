import React, { useState } from 'react';
import AppRoutes from './components/Routes';
import Footer from './components/Footer'; // Adjust the path if necessary

const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleRegister = (userData) => {
    setRegisteredUsers(prevUsers => [...prevUsers, userData]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppRoutes 
        registeredUsers={registeredUsers} 
        onRegister={handleRegister} 
      />
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
};

export default App;
