// Users state slice
// Manages users-related state using Redux Toolkit
// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Users slice for managing user data state
// Handles user profiles, user lists, and user information
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    currentUser: null,
  },
  reducers: {
    // Action to set the user list
    setUserList(state, action) {
      state.userList = action.payload;
    },
    // Action to set the current user
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    // Additional reducers for managing users can be added here
  },
});

// Export actions and reducer
export const { setUserList, setCurrentUser } = usersSlice.actions;
export default usersSlice.reducer;