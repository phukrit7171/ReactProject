import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import FriendList from '../features/friends/FriendList.jsx';
import FriendRequestList from '../features/friends/FriendRequestList.jsx';
// 1. Import the hooks
import {
  useGetMyFriendStatusQuery,
  useRespondToRequestMutation,
} from '../services/apiSlice.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

const FriendsPage = () => {
  // 2. Call the query hook
  const {
    data: friendStatus,
    isLoading,
    isError,
  } = useGetMyFriendStatusQuery(
      undefined, 
      { pollingInterval: 15000 } // Poll for new requests every 15s
  );

  // 3. Call the mutation hook
  const [respondToRequest] = useRespondToRequestMutation();

  // 4. Filter the data into two lists
  const { friends, requests } = useMemo(() => {
    const friends = [];
    const requests = [];
    if (friendStatus) {
      friendStatus.forEach((item) => {
        if (item.status === 'accepted') {
          friends.push(item);
        } else if (item.status === 'pending') {
          requests.push(item);
        }
      });
    }
    return { friends, requests };
  }, [friendStatus]);

  const handleRespond = async (friendshipid, response) => {
    try {
      // 5. Call the mutation
      await respondToRequest({ friendshipid, response }).unwrap();
      // 'useGetMyFriendStatusQuery' will refetch automatically
      // because the mutation 'invalidatesTags: ['Friend']'
    } catch (err) {
      console.error('Failed to respond to request:', err);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Typography color="error">Error loading friends.</Typography>;

  return (
    <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h5">Friend Requests</Typography>
        <FriendRequestList
          requests={requests}
          onAccept={(id) => handleRespond(id, 'accept')}
          onDecline={(id) => handleRespond(id, 'decline')}
        />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h5">My Friends</Typography>
        <FriendList friends={friends} />
      </Box>
    </Box>
  );
};

export default FriendsPage;