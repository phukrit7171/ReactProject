import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Box } from '@mui/material';
import { useGetFriendStatusQuery, useRespondToFriendRequestMutation } from '../friends/friendsApi';

const FriendRequests = () => {
  const { data: friendData, isLoading, error, refetch } = useGetFriendStatusQuery();
  const [respondToRequest] = useRespondToFriendRequestMutation();

  if (isLoading) return <div>Loading friend requests...</div>;
  if (error) return <div>Error loading friend requests: {error.message}</div>;

  const incomingRequests = friendData?.incomingRequests || [];
  const outgoingRequests = friendData?.outgoingRequests || [];

  const handleResponse = async (friendshipid, response) => {
    try {
      await respondToRequest({ friendshipid, response }).unwrap();
      refetch(); // Refresh the data
    } catch (err) {
      console.error(`Failed to ${response} request:`, err);
    }
  };

  return (
    <div>
      <Box mb={3}>
        <h3>Incoming Requests ({incomingRequests.length})</h3>
        {incomingRequests.length > 0 ? (
          <List>
            {incomingRequests.map((request) => (
              <ListItem key={request._id}>
                <ListItemAvatar>
                  <Avatar>
                    {request.sender?.name?.charAt(0) || 'U'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={request.sender?.name || request.sender?.email} 
                  secondary={`Friend request from ${request.sender?.email}`}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="small" 
                  onClick={() => handleResponse(request._id, 'accept')}
                  sx={{ mr: 1 }}
                >
                  Accept
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="small" 
                  onClick={() => handleResponse(request._id, 'reject')}
                >
                  Reject
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No incoming friend requests.</p>
        )}
      </Box>

      <Box>
        <h3>Outgoing Requests ({outgoingRequests.length})</h3>
        {outgoingRequests.length > 0 ? (
          <List>
            {outgoingRequests.map((request) => (
              <ListItem key={request._id}>
                <ListItemAvatar>
                  <Avatar>
                    {request.receiver?.name?.charAt(0) || 'U'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={request.receiver?.name || request.receiver?.email} 
                  secondary={`Friend request sent to ${request.receiver?.email}`}
                />
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="small"
                  disabled
                >
                  Pending
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No outgoing friend requests.</p>
        )}
      </Box>
    </div>
  );
};

export default FriendRequests;