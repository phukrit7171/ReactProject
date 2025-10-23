// Messages API service
// Contains all API calls related to chat messages
// Import API configuration and axios or fetch for making requests
import { API_ENDPOINTS } from '../../constants/apiConfig.js'

// Messages API functions for sending, receiving, and managing chat messages
const messagesApi = {
  // Example function to fetch messages for a chat
  async fetchMessages(chatId) {
    const response = await fetch(`${API_ENDPOINTS.BASE_URL}/chats/${chatId}/messages`);
    return response.json();
  },

  // Additional API functions can be added here
};

export default messagesApi;