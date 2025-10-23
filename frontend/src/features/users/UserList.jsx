// User list component
// Displays a list of users in the application
import React from 'react';
// Import Material UI components
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import LoadingSpinner from '../../components/common/LoadingSpinner'; //
import ErrorMessage from '../../components/common/ErrorMessage'; //
// 1. Import query hook
import { useGetUsersQuery } from '../../services/apiSlice.js';

// UserList component to show all users
const UserList = () => {
  // 2. เรียกใช้ query hook
  const { 
    data: users, 
    isLoading, 
    isSuccess, 
    isError, 
    error 
  } = useGetUsersQuery();

  // 3. จัดการ State ต่างๆ
  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <List>
        {users.map((user) => (
          <div key={user.id} style={{ padding: '8px' }}>
            {user.username} ({user.originallang})
          </div>
        ))}
      </List>
    );
  } else if (isError) {
    content = <ErrorMessage message={error.toString()} />;
  }

  return (
    <div>
      <Typography variant="h5">All Users</Typography>
      {content}
    </div>
  );
};

export default UserList;