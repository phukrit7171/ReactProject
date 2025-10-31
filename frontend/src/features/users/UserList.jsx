import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import { useGetUsersQuery } from '../../services/apiSlice';

const UserList = () => {
  // Use RTK Query hook to fetch users and leverage Redux cache
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useGetUsersQuery();

  // Debug: log users payload and fetch status to help diagnose shape/contents
  useEffect(() => {
    if (!isLoading) {
      // eslint-disable-next-line no-console
      console.debug('UserList: fetch result', { isLoading, isError, error, users });
    }
  }, [users, isLoading, isError, error]);

  if (isLoading) return <CircularProgress />;
  if (isError) {
    const message = error?.data?.message ?? error?.error ?? 'Failed to load users';
    return <Alert severity="error">{message}</Alert>;
  }
  if (!users || users.length === 0) return <Alert severity="info">No users found</Alert>;

  return (
    <List>
      {users.map((user, idx) => {
        // Use a stable unique key when possible, fall back to index as last resort
        const key = user?.id ?? user?._id ?? user?.username ?? idx;
        return (
          <ListItem key={String(key)}>
            <ListItemText primary={user?.username ?? 'Unknown user'} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default UserList;
