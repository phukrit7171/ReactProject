// Custom toast notification hook
// Provides a way to display toast notifications throughout the application
// Works with notification library like Material UI Snackbar or similar

// useToast hook for displaying toast notifications
import { useState } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, severity = 'info') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, severity }]);
    setTimeout(() => removeToast(id), 3000); // Auto-remove after 3 seconds
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
};

export default useToast;