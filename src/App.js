import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// Importing necessary modules from React Router for handling routes

import AuthPage from './components/authpage'; // Importing the AuthPage component
import WelcomePage from './components/WelcomePage'; // Importing the WelcomePage component
import ChatListPage from './components/ChatListPage'; // Importing the ChatListPage component
import ProfileEditPage from './components/ProfileEditPage'; // Importing the ProfileEditPage component
import RoomsPage from './components/RoomsPage'; // Importing the RoomsPage component
import ChatScreen from './components/ChatScreen'; // Importing the ChatScreen component

// Defining the main App component
function App() {
  return (
    <Router> {/* Wrapping the application with Router to enable routing */}
      <Routes> {/* Defining the different routes for the application */}
        <Route exact path="/" element={<WelcomePage />} /> {/* Route for the WelcomePage component */}
        <Route path="/auth" element={<AuthPage />} /> {/* Route for the AuthPage component */}
        <Route path="/chats" element={<ChatListPage />} /> {/* Route for the ChatListPage component */}
        <Route path="/profile" element={<ProfileEditPage />} /> {/* Route for the ProfileEditPage component */}
        <Route path="/rooms" element={<RoomsPage />} /> {/* Route for the RoomsPage component */}
        <Route path="/chat/:exchangeName" element={<ChatScreen />} /> {/* Route for the ChatScreen component, with a dynamic parameter for exchangeName */}
      </Routes>
    </Router>
  );
}

export default App; // Exporting the App component as the default export
