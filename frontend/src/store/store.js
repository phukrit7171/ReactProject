// Main Redux store
// Centralized application state management
// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import feature slices
// import authSlice from '../features/auth/authSlice.js';
// import chatSlice from '../features/chat/chatSlice.js';
// import friendsSlice from '../features/friends/friendsSlice.js';
// import usersSlice from '../features/users/usersSlice.js';

// Main Redux store configuration
// Combines all feature slices into a single store
const store = configureStore({
  reducer: {
    // auth: authSlice,
    // chat: chatSlice,
    // friends: friendsSlice,
    // users: usersSlice,
  },
});

export default store;