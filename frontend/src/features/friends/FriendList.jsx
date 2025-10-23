// Friend list component
// Displays a list of the user's friends
import React from 'react';
// Import Material UI components for list display
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const FriendList = ({ friends, onStartChat }) => {
  return (
    <List>
      {friends.map((friend) => (
        <ListItem
          key={friend.id}
          secondaryAction={
            <Button
              variant="outlined"
              size="small"
              onClick={() => onStartChat(friend.id)}
            >
              Start Chat
            </Button>
          }
        >
          <ListItemText
            primary={friend.username || `Friend ${friend.id}`}
            secondary={friend.isOnline ? 'Online' : 'Offline'}
          />
        </ListItem>
      ))}
    </List>
  );
}
export default FriendList;