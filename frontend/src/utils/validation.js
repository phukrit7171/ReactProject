// Validation utilities
// Provides functions for validating form inputs and other data
// Includes email validation, password strength, and other common validations

// Validation functions for form inputs and data validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password) => {
  // Password must be at least 8 characters, contain uppercase, lowercase, number, and special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isNonEmptyString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

export const isValidUsername = (username) => {
  // Username must be alphanumeric and between 3 to 20 characters
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
};