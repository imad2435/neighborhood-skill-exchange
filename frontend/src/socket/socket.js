import { io } from 'socket.io-client';

// Get the backend URL from environment variables, defaulting to localhost.
// This is crucial for deployment.
const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5001';

// Create the socket instance.
// We set autoConnect to false so we can manually connect only when a user is logged in.
const socket = io(URL, {
  autoConnect: false,
});

// Optional: You can add logging to see socket events in the browser console for debugging.
socket.onAny((event, ...args) => {
  console.log(`Socket Event: ${event}`, args);
});

export default socket;