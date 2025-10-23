// Protected route component
// Ensures that users are authenticated before accessing certain routes
import React from 'react';
// Import routing components from react-router-dom
import { Navigate } from 'react-router-dom';
// Import state from react-redux (if needed for auth state)
import { useSelector } from 'react-redux';

// ProtectedRoute component to restrict access to authenticated users
// Redirects unauthenticated users to login page
const ProtectedRoute = ({ children }) => {
  // Example authentication check (replace with real auth logic)
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;