import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomsPage.css';
import groupsIcon from '../assets/group.png'; // Importing the group icon image
import backIcon from '../assets/back.png'; // Importing the back icon image
import deleteIcon from '../assets/delete.png'; // Importing the delete icon image

const RoomsPage = () => {
    // State variables
    const [rooms, setRooms] = useState([]); // Stores the list of rooms fetched from the server
    const [showCreateRoom, setShowCreateRoom] = useState(false); // Toggles the create room form
    const [newRoomName, setNewRoomName] = useState(''); // Stores the new room name entered by the user
    const navigate = useNavigate(); // React Router's hook for navigation

    // Fetch rooms when the component mounts
    useEffect(() => {
        fetchRooms(); // Fetches the list of available rooms from the server
    }, []);

    // Function to fetch rooms from the server
    const fetchRooms = () => {
        fetch('http://localhost:5001/exchanges') // API call to get the list of rooms
            .then(response => response.json()) // Parsing the response as JSON
            .then(data => setRooms(data)) // Updating the state with the list of rooms
            .catch(error => console.error('Error fetching exchange names:', error)); // Handling any errors
    };

    // Function to handle clicking on a room
    const handleRoomClick = (exchangeName) => {
        navigate(`/chat/${exchangeName}`); // Navigating to the chat screen for the selected room
    };

    // Function to handle creating a new room
    const handleCreateRoom = () => {
        if (newRoomName.trim() === '') { // Checking if the room name is empty
            alert('Please enter a room name.'); // Alerting the user if the room name is empty
            return;
        }

        // Sending a request to the server to create a new room
        fetch('http://localhost:5001/create-exchange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ exchangeName: newRoomName }), // Sending the new room name in the request body
        })
            .then(response => response.json()) // Parsing the response as JSON
            .then(data => {
                if (data.success) { // Checking if the room was successfully created
                    setRooms([...rooms, newRoomName]); // Updating the state with the new room added
                    setNewRoomName(''); // Clearing the new room name input
                    setShowCreateRoom(false); // Hiding the create room form
                } else {
                    alert('Failed to create room. Please try again.'); // Alerting the user if room creation failed
                }
            })
            .catch(error => console.error('Error creating exchange:', error)); // Handling any errors
    };

    // Function to handle deleting a room
    const handleDeleteRoom = (exchangeName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the room "${exchangeName}"?`); // Asking for confirmation
        if (confirmDelete) {
            // Optimistically updating the state before the API call
            setRooms(rooms.filter(room => room !== exchangeName));

            // Sending a request to the server to delete the room
            fetch(`http://localhost:5001/delete-exchange`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exchangeName }), // Sending the room name to be deleted
            })
                .then(response => response.json()) // Parsing the response as JSON
                .then(data => {
                    if (!data.success) { // Checking if the deletion was unsuccessful
                        alert('Failed to delete room. Please try again.'); // Alerting the user
                        fetchRooms(); // Refetching the rooms to sync the state with the server
                    }
                })
                .catch(error => {
                    console.error('Error deleting exchange:', error); // Handling any errors
                    fetchRooms(); // Refetching the rooms to sync the state with the server
                });
        }
    };

    // Function to handle clicking the back button
    const handleBackClick = () => {
        navigate('/chats'); // Navigating back to the chats screen
    };

    return (
        <div className="rooms-page">
            <img src={backIcon} alt="Back" className="back-room-icon" onClick={handleBackClick} /> {/* Back button */}
            <h1>Available Rooms To Join!</h1> {/* Heading for the rooms page */}
            <ul className="rooms-list">
                {rooms.map((room, index) => (
                    <li key={index} className="room-item">
                        <img src={groupsIcon} alt={room} className="room-icon" onClick={() => handleRoomClick(room)} /> {/* Room icon */}
                        <span onClick={() => handleRoomClick(room)}>{room}</span> {/* Room name */}
                        <img
                            src={deleteIcon}
                            alt="Delete"
                            className="delete-icon"
                            onClick={() => handleDeleteRoom(room)}
                        /> {/* Delete icon */}
                    </li>
                ))}
            </ul>
            {showCreateRoom && (
                <div className="create-room-container">
                    <input
                        type="text"
                        placeholder="Enter room name"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                        className="new-room-input"
                    /> {/* Input field for the new room name */}
                    <button onClick={handleCreateRoom} className="create-room-button">
                        Create Room
                    </button> {/* Button to create the new room */}
                </div>
            )}
            <button
                className="proceed-button"
                onClick={() => setShowCreateRoom(!showCreateRoom)}
            >
                {showCreateRoom ? 'Cancel' : 'Create Room'}
            </button> {/* Button to toggle the create room form */}
        </div>
    );
};

export default RoomsPage;
