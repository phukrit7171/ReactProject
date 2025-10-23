// Authentication state slice
// Manages authentication-related state using Redux Toolkit
// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Auth slice for managing user authentication state
// Handles user login, logout, and authentication status
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;