// UserListItem.jsx
// Represents a single user in the list (view only)
import React from 'react';
import { ListItem, ListItemText } from '@mui/material';

const UserListItem = ({ user }) => {
  return (
    <ListItem>
      <ListItemText
        primary={user.username}
        secondary={`Language: ${user.originallang}`}
      />
    </ListItem>
  );
};

export default UserListItem;
