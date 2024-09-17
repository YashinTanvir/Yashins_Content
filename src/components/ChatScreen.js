import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './ChatScreen.css'; // Importing the CSS file for styling
import backIcon from '../assets/back.png'; // Importing the back icon
import groupIcon from '../assets/group.png'; // Importing the group icon
import sendIcon from '../assets/send.png'; // Importing the send icon
import audioIcon from '../assets/audio.png'; // Importing the audio call icon
import videoIcon from '../assets/video.png'; // Importing the video call icon
import plusIcon from '../assets/plus.png'; // Importing the plus icon

// Establishing a socket connection to the server
const socket = io('http://localhost:5001');

const ChatScreen = () => {
    // Getting the exchange name from the URL parameters
    const { exchangeName } = useParams();
    // Setting up state to manage the messages, the new message input, and formatting options
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [formattingOptions, setFormattingOptions] = useState({
        bold: false, // State for bold text formatting
        italic: false, // State for italic text formatting
        color: '#000000', // Default color for text is black
    });
    const [showFormattingOptions, setShowFormattingOptions] = useState(false); // Controls visibility of formatting options
    const navigate = useNavigate(); // Hook for navigation

    const messageSet = useRef(new Set()); // Ref to keep track of unique messages
    const username = localStorage.getItem('activeUser'); // Retrieving the active username from local storage

    // useEffect hook to manage socket events
    useEffect(() => {
        // Emitting a 'join' event to the server when the component mounts
        socket.emit('join', exchangeName, username);

        // Function to handle incoming messages
        const handleMessage = (message) => {
            if (!messageSet.current.has(message)) {
                messageSet.current.add(message); // Adding the message to the set to avoid duplicates
                setMessages((prevMessages) => [...prevMessages, message]); // Updating the messages state
            }
        };

        // Listening for 'message' events from the server
        socket.on('message', handleMessage);

        // Cleanup function to run when the component unmounts
        return () => {
            socket.emit('leave', exchangeName, username); // Emitting a 'leave' event to the server
            socket.off('message', handleMessage); // Removing the 'message' event listener
        };
    }, [exchangeName, username]); // Dependency array to re-run the effect when exchangeName or username changes

    // Function to handle sending a message
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const timestamp = new Date().getTime(); // Getting the current timestamp
            let formattedMessage = `${newMessage}`;

            // Applying bold formatting if selected
            if (formattingOptions.bold) {
                formattedMessage = `<b>${formattedMessage}</b>`;
            }
            // Applying italic formatting if selected
            if (formattingOptions.italic) {
                formattedMessage = `<i>${formattedMessage}</i>`;
            }
            // Applying color formatting if a color other than black is selected
            if (formattingOptions.color !== '#000000') {
                formattedMessage = `<span style="color:${formattingOptions.color};">${formattedMessage}</span>`;
            }

            // Creating the message to send, including the username and timestamp
            const messageToSend = `${username}: ${formattedMessage} ${timestamp}`;
            socket.emit('sendMessage', { exchangeName, message: messageToSend }); // Emitting the message to the server
            if (!messageSet.current.has(messageToSend)) {
                messageSet.current.add(messageToSend); // Adding the message to the set to avoid duplicates
                setMessages((prevMessages) => [...prevMessages, messageToSend]); // Updating the messages state
            }
            setNewMessage(''); // Clearing the input field
        }
    };

    // Function to handle navigating back to the rooms page
    const handleBack = () => {
        navigate('/rooms');
    };

    // Function to toggle bold formatting
    const handleBoldClick = () => {
        setFormattingOptions({ ...formattingOptions, bold: !formattingOptions.bold });
    };

    // Function to toggle italic formatting
    const handleItalicClick = () => {
        setFormattingOptions({ ...formattingOptions, italic: !formattingOptions.italic });
    };

    // Function to handle color change
    const handleColorChange = (event) => {
        setFormattingOptions({ ...formattingOptions, color: event.target.value });
    };

    // Function to toggle the visibility of the formatting options
    const toggleFormattingOptions = () => {
        setShowFormattingOptions(!showFormattingOptions);
    };

    return (
        <div className="chat-screen">
            {/* Header section with back button, room info, and call icons */}
            <div className="chat-header">
                <img src={backIcon} alt="Back" className="chat-back-icon" onClick={handleBack} />
                <div className="chat-info">
                    <img src={groupIcon} alt="Group Icon" className="group-icon" />
                    <h2 className="room-name">{exchangeName}</h2>
                </div>
                <div className="chat-actions">
                    <img src={videoIcon} alt="Video Call" className="video-icon" />
                    <img src={audioIcon} alt="Audio Call" className="audio-icon" />
                </div>
            </div>

            {/* Container for displaying chat messages */}
            <div className="chat-messages">
                {messages.map((message, index) => {
                    const isOwnMessage = message.startsWith(`${username}:`);
                    return (
                        <div
                            key={index}
                            className={`message ${isOwnMessage ? 'sent' : 'received'}`}
                            dangerouslySetInnerHTML={{ __html: message.split(/\d{13}$/)[0] }} // Displaying the message without the timestamp
                        ></div>
                    );
                })}
            </div>

            {/* Input area for typing and sending messages */}
            <div className="chat-input">
                <div className="chat-input-container">
                    {showFormattingOptions && (
                        <div className="formatting-options">
                            <button className={`format-btn ${formattingOptions.bold ? 'active' : ''}`} onClick={handleBoldClick}>
                                <b>B</b>
                            </button>
                            <button className={`format-btn ${formattingOptions.italic ? 'active' : ''}`} onClick={handleItalicClick}>
                                <i>I</i>
                            </button>
                            <div
                                className="color-display"
                                style={{
                                    backgroundColor: formattingOptions.color, // Sets the background color to the selected color
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%', // Makes the color display a circle
                                    border: '1px solid #ccc',
                                    cursor: 'pointer'
                                }}
                                onClick={() => document.getElementById('color-picker').click()} // Opens the color picker when clicked
                            ></div>
                            <input
                                id="color-picker"
                                type="color"
                                value={formattingOptions.color}
                                onChange={handleColorChange}
                                style={{ display: 'none' }} // Hides the color picker input
                                title="Choose text color"
                            />
                        </div>
                    )}
                    <img src={plusIcon} alt="More" className="plus-icon" onClick={toggleFormattingOptions} />
                    <input
                        type="text"
                        placeholder="Type here ..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button onClick={handleSendMessage} className="send-button">
                        <img src={sendIcon} alt="Send" className="send-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
