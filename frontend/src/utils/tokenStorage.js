// Token storage utilities
// Provides functions for storing, retrieving, and managing authentication tokens
// Uses localStorage or sessionStorage for token persistence

// Token storage and retrieval functions for authentication
export const storeToken = (token, rememberMe = false) => {
  if (rememberMe) {
    localStorage.setItem('authToken', token);
  } else {
    sessionStorage.setItem('authToken', token);
  }
};

export const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
};