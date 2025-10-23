// Friend request list component
// Displays a list of pending friend requests
import React from 'react';
// Import Material UI components for list display
import List from '@mui/material/List';

// FriendRequestList component to show pending friend requests
// Contains multiple FriendRequestItem components
const FriendRequestList = ({ requests, onAccept, onDecline }) => {
  return (
    <List>
      {requests.map((request) => (
        <div key={request.id} style={{ padding: '8px' }}>
          <strong>{request.name}</strong>
          <div style={{ marginTop: '8px' }}>
            <button onClick={() => onAccept(request.id)} style={{ marginRight: '8px' }}>Accept</button>
            <button onClick={() => onDecline(request.id)}>Decline</button>
          </div>
        </div>
      ))}
    </List>
  );
};

export default FriendRequestList;