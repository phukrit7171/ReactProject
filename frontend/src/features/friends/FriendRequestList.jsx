import React from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FriendRequestItem from './FriendRequestItem.jsx';

const FriendRequestList = ({ requests = [], onAccept, onDecline }) => {
  if (requests.length === 0) {
    return <Typography>No pending friend requests.</Typography>;
  }
  
  return (
    <List>
      {requests.map((request) => (
        <FriendRequestItem
          key={request.id}
          request={request}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </List>
  );
};

export default FriendRequestList;