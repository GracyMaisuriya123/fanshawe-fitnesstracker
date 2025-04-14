import { io } from 'socket.io-client';

// Connect to the backend Socket.IO server
const socket = io('http://localhost:3001');  // Change to your backend URL if needed

// Function to send a message to the server
export const sendMessage = (message) => {
    socket.emit('message', message);  // Emit a 'message' event to the server
};

// Function to listen for incoming messages
export const onMessageReceived = (callback) => {
    socket.on('message', (message) => {
        callback(message);  // Call the passed callback with the incoming message
    });
};



