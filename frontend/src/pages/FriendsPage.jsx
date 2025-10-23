import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import FriendList from "../features/friends/FriendList.jsx";
import FriendRequestList from "../features/friends/FriendRequestList.jsx";
import UserList from "../features/users/UserList.jsx"; // 1. Import UserList
import { useNavigate } from "react-router-dom"; // 2. Import useNavigate
import {
  useGetMyFriendStatusQuery,
  useRespondToRequestMutation,
  useCreateChatroomMutation,
} from "../services/apiSlice.js";
import LoadingSpinner from "../components/common/LoadingSpinner.jsx";

const FriendsPage = () => {
  const navigate = useNavigate();
  // 2. Call the query hook
  const {
    data: friendStatus,
    isLoading,
    isError,
  } = useGetMyFriendStatusQuery(undefined, { pollingInterval: 15000 });

  // 3. Call the mutation hook
  const [respondToRequest] = useRespondToRequestMutation();
  const [createChatroom] = useCreateChatroomMutation();

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
      await respondToRequest({ friendshipid, response }).unwrap();
    } catch (err) {
      console.error('Failed to respond to request:', err);
    }
  };

  // 7. สร้างฟังก์ชัน handleStartChat
  const handleStartChat = async (targetuserid) => {
    try {
      // เรียก API `POST /v1/chatrooms`
      await createChatroom({ targetuserid }).unwrap();
      // ถ้าสำเร็จ ให้เด้งไปหน้า Chat
      navigate('/');
    } catch (err) {
      console.error('Failed to create chatroom:', err);
      alert(err.data?.message || 'Failed to start chat');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Typography color="error">Error loading friends.</Typography>;

  return (
    <Box sx={{ display: 'flex', height: '100%', gap: 3 }}>
      {/* 8. ปรับ Layout ใหม */}
      <Box sx={{ width: '33%' }}>
        <Typography variant="h5">Friend Requests</Typography>
        <FriendRequestList
          requests={requests}
          onAccept={(id) => handleRespond(id, 'accept')}
          onDecline={(id) => handleRespond(id, 'decline')}
        />
      </Box>
      <Box sx={{ width: '33%' }}>
        <Typography variant="h5">My Friends</Typography>  
        <FriendList friends={friends} onStartChat={handleStartChat} />
      </Box>
      <Box sx={{ width: '33%', borderLeft: '1px solid #ccc', pl: 2 }}>
        <Typography variant="h5">Find Users</Typography>
        <UserList />
      </Box>
    </Box>
  );
};
export default FriendsPage;