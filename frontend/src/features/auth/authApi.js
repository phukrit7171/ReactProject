// Authentication API service
// Contains all API calls related to user authentication
// Import API configuration and axios or fetch for making requests
import { API_ENDPOINTS } from '../../constants/apiConfig.js'

// Auth API functions for login, register, logout, etc.\
const authApi = {
  // Example function to login a user
  async login(credentials) {
    const response = await fetch(`${API_ENDPOINTS.BASE_URL}/auth/login`, {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Additional API functions can be added here
};

export default authApi;