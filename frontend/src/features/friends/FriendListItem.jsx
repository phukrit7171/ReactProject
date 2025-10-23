// Friend list item component
// Represents a single friend in the friend list
import React from 'react';
// Import Material UI components for list items
import ListItem from '@mui/material/ListItem';

// FriendListItem component for individual friend display
// Shows friend name, status, and other relevant information
const FriendListItem = ({ friend, onSelect }) => {
  return (
    <ListItem
      button
      onClick={() => onSelect(friend.id)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <strong>{friend.name}</strong>
      <span style={{ fontSize: '0.9em', color: friend.isOnline ? 'green' : 'red' }}>
        {friend.isOnline ? 'Online' : 'Offline'}
      </span>
    </ListItem>
  );
};

export default FriendListItem;