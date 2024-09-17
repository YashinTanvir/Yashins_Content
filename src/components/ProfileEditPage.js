import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profilePic from '../assets/profile.png';
import checkIcon from '../assets/check.png';
import backIcon from '../assets/back.png';
import './ProfileEditPage.css';

const ProfileEditPage = () => {
  const navigate = useNavigate(); // Initializing the navigation function
  const [username, setUsername] = useState(''); // State to store the username
  const [name, setName] = useState(''); // State to store the name
  const [phone, setPhone] = useState(''); // State to store the phone number
  const [bio, setBio] = useState(''); // State to store the biography
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // State to store the theme (light or dark)

  // Loading user data when the component mounts
  useEffect(() => {
    const activeUser = localStorage.getItem('activeUser'); // Retrieving the active user from localStorage
    if (activeUser) {
      setUsername(activeUser); // Setting the username
      const users = JSON.parse(localStorage.getItem('users')) || {}; // Retrieving the users from localStorage
      if (users[activeUser]) {
        setName(activeUser); // Setting the name to the active user's name
        setPhone(users[activeUser].phone || ''); // Setting the phone number if available
        setBio(users[activeUser].bio || ''); // Setting the biography if available
      }
    }
  }, []);

  // Applying the selected theme to the body and saving it in localStorage
  useEffect(() => {
    document.body.className = theme; // Setting the className on the body element to the theme
    localStorage.setItem('theme', theme); // Saving the selected theme in localStorage
  }, [theme]);

  // Function to handle saving the profile information
  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {}; // Retrieving the users from localStorage
    if (username && users[username]) {
      users[username] = { ...users[username], phone, bio }; // Updating the phone number and biography
      localStorage.setItem('users', JSON.stringify(users)); // Saving the updated users in localStorage
      alert('Profile updated successfully!'); // Showing a success message
      navigate('/chats'); // Navigating to the chats page
    }
  };

  // Function to handle changing the theme
  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Toggling between light and dark theme
  };

  // Function to handle logging out
  const handleLogout = () => {
    localStorage.removeItem('activeUser'); // Removing the active user from localStorage
    navigate('/auth'); // Navigating to the authentication page
  };

  return (
    <div className={`profile-edit-container ${theme}`}> {/* Applying the theme class to the container */}
      <div className="top-bar">
        <img src={backIcon} alt="Back" className="back-icon" onClick={() => navigate('/chats')} /> {/* Back button */}
        <h2>Edit Profile</h2> {/* Page title */}
        <img src={checkIcon} alt="Save" className="check-icon" onClick={handleSave} /> {/* Save button */}
      </div>
      <div className="profile-pic-container">
        <img src={profilePic} alt="Profile" className="profile-pic" /> {/* Profile picture */}
        <div className="camera-icon">📷</div> {/* Camera icon (not functional, for display) */}
      </div>
      <div className="input-container">
        <label>Name</label> {/* Label for name input */}
        <input 
          type="text" 
          placeholder="Your Username..." 
          value={name}
          onChange={(e) => setName(e.target.value)} // Updating the name state on input change
        />
      </div>
      <div className="input-container">
        <label>User Name</label> {/* Label for username input */}
        <input 
          type="text" 
          value={username}
          readOnly // Username is read-only
        />
      </div>
      <div className="input-container">
        <label>Change Number</label> {/* Label for phone number input */}
        <input 
          type="text" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // Updating the phone state on input change
        />
      </div>
      <div className="input-container">
        <label>Biography</label> {/* Label for biography textarea */}
        <textarea 
          value={bio}
          onChange={(e) => setBio(e.target.value)} // Updating the bio state on input change
        />
      </div>
      <div className="theme-toggle">
        <button onClick={handleThemeChange}>
          {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'} {/* Button to toggle theme */}
        </button>
      </div>
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          Logout {/* Logout button */}
        </button>
      </div>
    </div>
  );
};

export default ProfileEditPage;
