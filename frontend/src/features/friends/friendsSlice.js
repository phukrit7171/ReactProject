// Friends state slice
// Manages friends-related state using Redux Toolkit
// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Friends slice for managing friend relationships state
// Handles friend lists, friend requests, and friend status
const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friendsList: [],
    friendRequests: [],
  },
  reducers: {
    // Action to set the friends list
    setFriendsList(state, action) {
      state.friendsList = action.payload;
    },
    // Action to set the friend requests list
    setFriendRequests(state, action) {
      state.friendRequests = action.payload;
    },
    // Additional reducers for managing friends can be added here
  },
});

// Export actions and reducer
export const { setFriendsList, setFriendRequests } = friendsSlice.actions;
export default friendsSlice.reducer;