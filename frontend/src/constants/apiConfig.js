// API Configuration
// Contains all API endpoints and related settings
// Base URL for API requests
// API endpoints grouped by functionality
export const API_ENDPOINTS = {
  BASE_URL: 'https://api.example.com', // Replace with actual API base URL
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    GET_PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
  },
  CHAT: {
    GET_CHATROOMS: '/chatrooms',
    GET_MESSAGES: '/chats/{chatId}/messages',
    SEND_MESSAGE: '/chats/{chatId}/messages/send',
  },
};