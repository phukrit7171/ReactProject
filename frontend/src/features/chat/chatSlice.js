// Chat state slice
// Manages chat-related state using Redux Toolkit
// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Chat slice for managing chat application state
// Handles chat rooms, messages, and chat connections
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatRooms: [],
    currentRoom: null,
    messages: {},
  },
  reducers: {
    setChatRooms(state, action) {
      state.chatRooms = action.payload;
    },
    setCurrentRoom(state, action) {
      state.currentRoom = action.payload;
    },
    addMessage(state, action) {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(message);
    },
  },
});

// Export actions and reducer
export const { setChatRooms, setCurrentRoom, addMessage } = chatSlice.actions;
export default chatSlice.reducer;