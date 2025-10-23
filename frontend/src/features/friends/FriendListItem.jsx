// Friend list item component
// Represents a single friend in the friend list
import React from 'react';
// Import Material UI components for list items
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const FriendListItem = ({ friend, onSelect }) => {
  return (
    <ListItem
      secondaryAction={
        <Button variant="outlined" size="small" onClick={onSelect}>
          Start Chat
        </Button>
      }
    >

      <ListItemText
        primary={friend.username || `Friend ${friend.id}`}
        secondary={friend.isOnline ? 'Online' : 'Offline'}
      />
    </ListItem>
  );
};

export default FriendListItem;