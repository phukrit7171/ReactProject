import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logout } from '../features/auth/authSlice';
import { selectUser, selectIsAuthenticated, selectIsLoading } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout
  };
};