// Protected route component
// Ensures that users are authenticated before accessing certain routes
import React from 'react';
// Import routing components from react-router-dom
import { Navigate } from 'react-router-dom';
// Import authentication context or hook if available
// import { useAuth } from '../hooks/useAuth';

// ProtectedRoute component to restrict access to authenticated users
// Redirects unauthenticated users to login page