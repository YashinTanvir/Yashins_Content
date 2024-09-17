// src/socket.js
import io from 'socket.io-client';

// Create a single socket instance that can be reused across components
const socket = io('http://localhost:5001');

export default socket;
