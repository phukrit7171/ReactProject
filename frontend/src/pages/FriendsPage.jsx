import React, { useState } from "react";
import { 
  Box, 
  FormControl, 
  Select, 
  MenuItem, 
  Typography, 
  CircularProgress, 
  TextField, 
  Button,
  Paper
} from "@mui/material";
import FriendList from "../features/friends/FriendList";
import FriendRequestList from "../features/friends/FriendRequestList";
import { 
  useGetMyFriendStatusQuery, 
  useGetMeQuery, 
  useSendFriendRequestMutation 
} from "../services/apiSlice"; 

// Page for managing friends and friend requests
const FriendsPage = () => {
  const [view, setView] = useState("friends");
  const [targetUserId, setTargetUserId] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [sendFriendRequest, { isLoading: isSendingRequest }] = useSendFriendRequestMutation();

  // Fetch friend status data using RTK Query
  const { data: friendStatusData, error, isLoading, isError, refetch } = useGetMyFriendStatusQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: currentUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  }); // Get current user data

  // Initialize data arrays to prevent errors when data is not yet loaded
  // API returns an array of all friendship relationships, need to filter by status
  const allFriendships = friendStatusData || [];
  const currentUserId = currentUser?.id;
  
  // Only filter if we have both the friend status data and the current user ID
  const friends = currentUserId 
    ? allFriendships.filter(f => f && f.status === 'accepted')
    : [];
  const sentRequests = currentUserId 
    ? allFriendships.filter(f => f && f.status === 'pending' && f.sender && f.sender.id === currentUserId)
    : [];
  const receivedRequests = currentUserId 
    ? allFriendships.filter(f => f && f.status === 'pending' && f.receiver && f.receiver.id === currentUserId)
    : [];

  const handleSendRequest = async () => {
    if (!targetUserId.trim()) {
      alert("Please enter a valid user ID");
      return;
    }

    if (targetUserId === currentUserId) {
      alert("You cannot send a friend request to yourself.");
      return;
    }

    // Check if a friend request has already been sent to this user
    const existingRequest = sentRequests.find(request => 
      (request.receiver && request.receiver.id === targetUserId) || 
      (request.targetid && request.targetid === targetUserId)
    );
    
    if (existingRequest) {
      alert("You have already sent a friend request to this user.");
      return;
    }

    // Check if already friends with this user
    const existingFriend = friends.find(friend => {
      const isSender = friend.sender?.id === currentUserId || friend.senderid === currentUserId;
      const friendId = isSender 
        ? (friend.receiver?.id || friend.targetid) 
        : (friend.sender?.id || friend.senderid);
      return friendId === targetUserId;
    });
    
    if (existingFriend) {
      alert("You are already friends with this user.");
      return;
    }

    try {
      await sendFriendRequest({ targetid: targetUserId }).unwrap();
      setTargetUserId("");
      setRequestSent(true);
      setTimeout(() => setRequestSent(false), 3000);
    } catch (error) {
      console.error("Failed to send friend request:", error);
      let errorMessage = "Failed to send friend request. Please try again.";
      if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.error) {
        errorMessage = error.error;
      }
      
      // Provide specific error messages for common issues
      if (errorMessage.includes("already sent") || errorMessage.includes("already friends")) {
        alert("You have already sent a friend request to this user or you are already friends.");
      } else if (errorMessage.includes("yourself")) {
        alert("You cannot send a friend request to yourself.");
      } else if (errorMessage.includes("does not exist")) {
        alert("The user ID you entered does not exist.");
      } else {
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  // Show loading state if either current user data or friend status data is not loaded
  const isUserDataLoading = !currentUser;
  const isFriendDataLoading = isLoading;
  
  if (isUserDataLoading || isFriendDataLoading) {
    return (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography>Loading friends...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ mt: 6, textAlign: "center", color: "red" }}>
        <Typography>Error: {error?.data?.message || "Failed to load friends"}</Typography>
        <Typography
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={refetch}
        >
          Retry
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Welcome, {currentUser?.username}! (ID: {currentUser?.id})
      </Typography>
      <FormControl size="small" sx={{ mb: 3 }}>
        <Select
          value={view}
          onChange={(e) => setView(e.target.value)}
          sx={{
            fontSize: "1.5rem",
            minWidth: 150,
          }}
        >
          <MenuItem value="friends" sx={{ fontSize: "1.1rem" }}>Friends</MenuItem>
          <MenuItem value="received" sx={{ fontSize: "1.1rem" }}>Received Requests</MenuItem>
          <MenuItem value="sent" sx={{ fontSize: "1.1rem" }}>Sent Requests</MenuItem>
        </Select>
      </FormControl>

      <Box
        sx={{
          width: "400px",
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          boxShadow: 1,
          backgroundColor: "white",
        }}
      >
        {view === "friends" && <FriendList friendships={friends} />}
        {view === "send" && (
          <Paper 
            elevation={2} 
            sx={{ 
              p: 2, 
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h6" mb={2}>Send Friend Request</Typography>
            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
              <TextField
                fullWidth
                size="small"
                label="User ID"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="Enter user ID to add"
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSendRequest}
                disabled={isSendingRequest || !targetUserId.trim()}
              >
                {isSendingRequest ? 'Sending...' : 'Send'}
              </Button>
            </Box>
            {requestSent && (
              <Typography color="success.main" mt={1}>
                Friend request sent successfully!
              </Typography>
            )}
          </Paper>
        )}
        {view === "received" && <FriendRequestList requests={receivedRequests} type="received" />}
        {view === "sent" && <FriendRequestList requests={sentRequests} type="sent" />}
      </Box>
    </Box>
  );
};

export default FriendsPage;
