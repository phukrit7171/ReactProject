// User list item component
// Represents a single user in the user list
import React from 'react';
// Import Material UI components for list items
import { ListItem, ListItemText, Button } from '@mui/material';

const UserListItem = ({ user, onSendRequest, isSending }) => {
  return (
    <ListItem
      key={user.id}
      secondaryAction={
        <Button
          variant="contained"
          size="small"
          onClick={() => onSendRequest(user.id)}
          disabled={isSending}
        >
          Send Request
        </Button>
      }
    >
      <ListItemText
        primary={user.username}
        secondary={`Language: ${user.originallang}`}
      />
    </ListItem>
  );
};

export default UserListItem;