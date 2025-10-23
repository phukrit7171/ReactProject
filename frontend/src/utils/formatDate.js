// Date formatting utilities
// Provides functions for formatting dates consistently throughout the application

// formatDate function and other date-related utility functions
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};