// Main Redux store
// Centralized application state management
// Import configureStore from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
// Import feature slices
import authSlice from '../features/auth/authSlice.js';
import chatSlice from '../features/chat/chatSlice.js';
import friendsSlice from '../features/friends/friendsSlice.js';
import usersSlice from '../features/users/usersSlice.js';
// 1. Import apiSlice
import { apiSlice } from '../services/apiSlice.js';

// Main Redux store configuration
// Combines all feature slices into a single store
const store = configureStore({
  reducer: {
    // 2. เพิ่ม reducer จาก apiSlice
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Slices ที่มีอยู่
    auth: authSlice,
    chat: chatSlice,
    friends: friendsSlice,
    users: usersSlice,
  },
  // 3. เพิ่ม middleware ของ RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;