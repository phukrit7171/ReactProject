// API Configuration
// Contains all API endpoints and related settings

// Read BASE_URL from Environment Variables (VITE_API_URL as per README.md)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'; // fallback URL

export const API_ENDPOINTS = {
  BASE_URL: BASE_URL,
  AUTH: {
    SIGNUP: '/v1/auth/signup',
    LOGIN: '/v1/auth/login',
    LOGOUT: '/v1/auth/logout',
  },
  USERS: {
    GET_ALL: '/v1/users',
    GET_ME: '/v1/users/me',
    GET_BY_ID: (id) => `/v1/users/${id}`, // Example of using function
    UPDATE: (id) => `/v1/users/${id}`,
    DELETE: (id) => `/v1/users/${id}`,
  },
  CHATROOMS: {
    GET_ALL: '/v1/chatrooms',
    CREATE: '/v1/chatrooms',
    GET_BY_ID: (id) => `/v1/chatrooms/${id}`,
    DELETE: (id) => `/v1/chatrooms/${id}`,
  },
  MESSAGES: {
    CREATE: '/v1/messages',
    GET_BY_ID: (id) => `/v1/messages/${id}`,
    GET_BY_ROOM: (id) => `/v1/messages/chatrooms/${id}`, // ?filter=sent/received
    UPDATE: (id) => `/v1/messages/${id}`,
    DELETE: (id) => `/v1/messages/${id}`,
  },
  FRIENDS: {
    REQUEST: '/v1/friend/request',
    GET_STATUS: '/v1/friend/status/me',
    RESPOND: (friendshipId) => `/v1/friend/response/${friendshipId}`,
    DELETE: (friendshipId) => `/v1/friend/response/${friendshipId}`,
  },
};