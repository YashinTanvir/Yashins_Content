import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatListPage.css'; // Importing the CSS for the chat list page
import groupIcon from '../assets/group.png';
import aayushIcon from '../assets/aayush.png';
import manishaIcon from '../assets/manisha.png';
import tanvirIcon from '../assets/tanvir.png';
import baasemIcon from '../assets/baasem.png';
import aaishaIcon from '../assets/aaisha.png';
import sagarIcon from '../assets/sagar.png';
import editIcon from '../assets/edit.png';
import roomsIcon from '../assets/rooms.png';
import callsIcon from '../assets/calls.png';
import chatsIcon from '../assets/chats.png';
import settingsIcon from '../assets/settings.png';
import searchIcon from '../assets/search.png';
import backIcon from '../assets/back.png';

const ChatListPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Defining state for the search term
  const navigate = useNavigate(); // Using React Router's useNavigate hook to navigate between routes
  const [user, setUser] = useState(null); // Defining state to store the currently logged-in user

  // Loading user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Setting the user state with the stored user data
    }
  }, []);

  // Defining the list of chat conversations with relevant information like name, message, time, unread count, and icon
  const chats = [
    { name: 'PBT205 Group', message: 'Tanvir: Hey guys what’s ...', time: '13:00', unread: 2, icon: groupIcon },
    { name: 'Aayush', message: <span style={{ paddingLeft: '57px' }}>Hi, what’s up?</span>, time: '2 min', unread: 4, icon: aayushIcon },
    { name: 'Manisha', message: <span style={{ paddingLeft: '50px' }}>Where do we go today?</span>, time: '16:20', unread: 0, icon: manishaIcon },
    { name: 'Tanvir', message: <span style={{ paddingLeft: '68px' }}>Typing ...</span>, time: '16:01', unread: 0, icon: tanvirIcon },
    { name: 'Baasem', message: <span style={{ paddingLeft: '55px' }}>Ok, deal 👍</span>, time: 'Wed', unread: 0, icon: baasemIcon },
    { name: 'Aaisha Rani', message: <span style={{ paddingLeft: '23px' }}>😂 😂</span>, time: 'Mon', unread: 0, icon: aaishaIcon },
    { name: 'Sagar khan', message: <span style={{ paddingLeft: '27px' }}>Whats your Progress!</span>, time: 'Fri', unread: 0, icon: sagarIcon }
  ];

  // Filtering the chat list based on the search term
  const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Handling the back button click to navigate to the authentication page
  const handleBack = () => {
    navigate('/auth');
  };

  // Handling the settings button click to navigate to the profile page
  const handleSettings = () => {
    navigate('/profile');
  };

  // Handling the rooms button click to navigate to the rooms page
  const handleRooms = () => {
    navigate('/rooms'); 
  };

  return (
    <div className="chat-list-page">
      {/* Rendering the top bar with back button, title, edit button, and search bar */}
      <div className="top-bar">
        <img src={backIcon} alt="Back" className="back-list-icon" onClick={handleBack} />
        <h2 className="title">Chats</h2>
        <img src={editIcon} alt="Edit" className="edit-icon" />
        <div className="search-container">
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input 
            type="text" 
            placeholder="Search ChatApp" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      {/* Rendering the list of chat conversations */}
      <div className="chat-list">
        {filteredChats.map((chat, index) => (
          <div key={index} className="chat-item">
            <img src={chat.icon} alt={chat.name} className="chat-icon" />
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-message">{chat.message}</div>
            </div>
            <div className="chat-time-unread">
              <div className="chat-time">{chat.time}</div>
              {chat.unread > 0 && <div className="chat-unread">{chat.unread}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Rendering the bottom navigation bar with different options */}
      <div className="bottom-bar">
        <div className="bottom-icon" onClick={handleRooms}>
          <img src={roomsIcon} alt="Rooms" className="bottom-icon-image" />
          Rooms
        </div>
        <div className="bottom-icon">
          <img src={callsIcon} alt="Calls" className="bottom-icon-image" />
          Calls
        </div>
        <div className="bottom-icon chats">
          <img src={chatsIcon} alt="Chats" className="bottom-icon-image" />
          Chats
        </div>
        <div className="bottom-icon" onClick={handleSettings}>
          <img src={settingsIcon} alt="Settings" className="bottom-icon-image" />
          Profile
        </div>
      </div>
    </div>
  );
};

export default ChatListPage;
