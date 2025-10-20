/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result and feedback
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const validations = [
    {
      isValid: password.length >= minLength,
      message: 'Password must be at least 8 characters long',
    },
    {
      isValid: hasUpperCase,
      message: 'Password must contain at least one uppercase letter',
    },
    {
      isValid: hasLowerCase,
      message: 'Password must contain at least one lowercase letter',
    },
    {
      isValid: hasNumbers,
      message: 'Password must contain at least one number',
    },
    {
      isValid: hasSpecialChar,
      message: 'Password must contain at least one special character',
    },
  ];

  const failedValidations = validations.filter((v) => !v.isValid);

  return {
    isValid: failedValidations.length === 0,
    errors: failedValidations.map((v) => v.message),
  };
};

/**
 * Validate form field
 * @param {string} value - Field value
 * @param {Object} rules - Validation rules
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (value, rules = {}) => {
  if (rules.required && !value) {
    return 'This field is required';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message || 'Invalid format';
  }

  return null;
};