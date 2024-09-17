import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css'; // Importing the CSS file for styling the component
import logo from '../assets/logo.png'; // Importing the logo image

// Defining the WelcomePage functional component
const WelcomePage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle navigation to different paths
  const navigateTo = (path) => {
    navigate(path); // Navigating to the specified path
  };

  return (
    <div className="welcome-container"> {/* Main container for the welcome page */}
      <div className="welcome-content"> {/* Container for the content */}
        <img src={logo} alt="Logo" className="logo" /> {/* Displaying the logo image */}
        <h1>Hello, Lets Chat</h1> {/* Main heading */}
        <p>What’s on your mind?<br />Chat Anywhere, Anytime</p> {/* Subheading with line break */}
        <button className="welcome-button" onClick={() => navigateTo('/auth')}>WELCOME</button> {/* Button to navigate to the authentication page */}
      </div>
    </div>
  );
};

export default WelcomePage; // Exporting the component as default
