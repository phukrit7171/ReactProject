import { configureStore } from '@reduxjs/toolkit';
import { api } from '../services/api';
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
// Import API endpoints to ensure they're registered
import '../features/auth/authApi';
import '../features/users/usersApi';
import '../features/chat/chatroomsApi';
import '../features/chat/messagesApi';
import '../features/friends/friendsApi';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;