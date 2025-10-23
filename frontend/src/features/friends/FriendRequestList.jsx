import React from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

// This component just renders the data it's given
const FriendRequestList = ({ requests = [], onAccept, onDecline }) => {
  if (requests.length === 0) {
    return <Typography>No pending friend requests.</Typography>;
  }
  
  return (
    <List>
      {requests.map((request) => (
        <ListItem key={request.id}>
          {/* This assumes the API returns a 'username' for the other user */}
          <ListItemText primary={request.username || `Request ${request.id}`} />
          <Box>
            <Button onClick={() => onAccept(request.id)} sx={{ marginRight: '8px' }}>
              Accept
            </Button>
            <Button onClick={() => onDecline(request.id)} color="error">
              Decline
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default FriendRequestList;