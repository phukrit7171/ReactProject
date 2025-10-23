// Friend request item component
// Represents a single friend request in the requests list
import React from 'react';
// Import Material UI components for list items
import ListItem from '@mui/material/ListItem';

// FriendRequestItem component for individual friend request display
// Shows requester name and accept/decline buttons
const FriendRequestItem = ({ request, onAccept, onDecline }) => {
  return (
    <ListItem
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <strong>{request.name}</strong>
      <div style={{ marginTop: '8px' }}>
        <button onClick={() => onAccept(request.id)} style={{ marginRight: '8px' }}>Accept</button>
        <button onClick={() => onDecline(request.id)}>Decline</button>
      </div>
    </ListItem>
  );
};

export default FriendRequestItem;