import { Navigate } from 'react-router-dom';
// Import state from react-redux (if needed for auth state)
import { getToken, removeToken } from '../../utils/tokenStorage';
import { useGetMeQuery } from '../../services/apiSlice';
import LoadingSpinner from '../common/LoadingSpinner';

// ProtectedRoute component to restrict access to authenticated users
// Redirects unauthenticated users to login page
const ProtectedRoute = ({ children }) => {
  // Check for stored token first to avoid unnecessary request
  const token = getToken();

  if (!token) return <Navigate to="/login" replace />;

  // Validate token by calling /v1/users/me. Skip query if no token.
  const { data, isLoading, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  if (isLoading) return <LoadingSpinner />;

  // If validation failed, clear token and redirect to login
  if (isError || !isSuccess || !data) {
    removeToken();
    return <Navigate to="/login" replace />;
  }

  // Token is valid
  return children;
};

export default ProtectedRoute;