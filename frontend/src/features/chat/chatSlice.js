import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeRoomId: null,
  rooms: [],
  messages: {},
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveRoom: (state, action) => {
      state.activeRoomId = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    addMessage: (state, action) => {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(message);
    },
    setMessages: (state, action) => {
      const { roomId, messages } = action.payload;
      state.messages[roomId] = messages;
    },
  },
});

export const {
  setActiveRoom,
  setRooms,
  addMessage,
  setMessages,
} = chatSlice.actions;

export default chatSlice.reducer;