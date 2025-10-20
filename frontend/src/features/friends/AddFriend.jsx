import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useSendFriendRequestMutation } from '../friends/friendsApi';

const AddFriend = () => {
  const [targetId, setTargetId] = useState('');
  const [sendRequest, { isLoading, error }] = useSendFriendRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (targetId) {
      try {
        await sendRequest(targetId).unwrap();
        setTargetId('');
        alert('Friend request sent successfully!');
      } catch (err) {
        console.error('Failed to send friend request:', err);
      }
    }
  };

  return (
    <div>
      <h2>Add Friend</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <TextField
          label="Friend's ID or Email"
          variant="outlined"
          fullWidth
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Request'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error.data?.message || error.error || 'Failed to send friend request'}
        </Typography>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Enter your friend's ID or email address to send them a friend request.
        </Typography>
      </Box>
    </div>
  );
};

export default AddFriend;