import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Paper,
  Container,
  Tabs,
  Tab,
  AppBar,
} from "@mui/material";
import FriendList from "../features/friends/FriendList";
import FriendRequestList from "../features/friends/FriendRequestList";
import {
  useGetMyFriendStatusQuery,
  useGetMeQuery,
  useSendFriendRequestMutation,
} from "../services/apiSlice";

// Component for managing friends and friend requests
const FriendsPage = () => {
  const [view, setView] = useState("friends");
  const [targetUserId, setTargetUserId] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [sendFriendRequest, { isLoading: isSendingRequest }] =
    useSendFriendRequestMutation();

  // Fetch friend status and current user data
  const {
    data: friendStatusData,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetMyFriendStatusQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: currentUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Initialize data arrays to prevent errors when data is not yet loaded
  const allFriendships = friendStatusData || [];
  const currentUserId = currentUser?.id;

  // Only filter if we have both the friend status data and the current user ID
  const friends = currentUserId
    ? allFriendships.filter((f) => f && f.status === "accepted")
    : [];
  const sentRequests = currentUserId
    ? allFriendships.filter(
        (f) =>
          f &&
          f.status === "pending" &&
          f.sender &&
          f.sender.id === currentUserId
      )
    : [];
  const receivedRequests = currentUserId
    ? allFriendships.filter(
        (f) =>
          f &&
          f.status === "pending" &&
          f.receiver &&
          f.receiver.id === currentUserId
      )
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
    const existingRequest = sentRequests.find(
      (request) =>
        (request.receiver && request.receiver.id === targetUserId) ||
        (request.targetid && request.targetid === targetUserId)
    );

    if (existingRequest) {
      alert("You have already sent a friend request to this user.");
      return;
    }

    // Check if already friends with this user
    const existingFriend = friends.find((friend) => {
      const isSender =
        friend.sender?.id === currentUserId ||
        friend.senderid === currentUserId;
      const friendId = isSender
        ? friend.receiver?.id || friend.targetid
        : friend.sender?.id || friend.senderid;
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
      if (
        errorMessage.includes("already sent") ||
        errorMessage.includes("already friends")
      ) {
        alert(
          "You have already sent a friend request to this user or you are already friends."
        );
      } else if (errorMessage.includes("yourself")) {
        alert("You cannot send a friend request to yourself.");
      } else if (errorMessage.includes("does not exist")) {
        alert("The user ID you entered does not exist.");
      } else {
        alert(`Error: ${errorMessage}`);
      }
    }
  };

  // Show loading state if data is not loaded
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
        <Typography>
          Error: {error?.data?.message || "Failed to load friends"}
        </Typography>
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
      >
        Manage Your Friends
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ mb: 4, textAlign: "center", color: "text.secondary" }}
      >
        Welcome, {currentUser?.username}! (Your ID: {currentUser?.id})
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <AppBar position="static" color="default" elevation={0}>
          <Tabs
            value={view}
            onChange={(e, newValue) => setView(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="Friends page tabs"
          >
            <Tab label="My Friends" value="friends" />
            <Tab label="Received Requests" value="received" />
            <Tab label="Send Request" value="send" />
          </Tabs>
        </AppBar>

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          {view === "friends" && <FriendList friendships={friends} />}

          {view === "send" && (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Send a Friend Request
              </Typography>
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter User ID"
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  placeholder="Enter the user ID of your friend"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendRequest}
                  disabled={isSendingRequest || !targetUserId.trim()}
                  sx={{ height: "56px", px: 4 }}
                >
                  {isSendingRequest ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </Box>
              {requestSent && (
                <Typography color="success.main" sx={{ mb: 2 }}>
                  Friend request sent successfully!
                </Typography>
              )}
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: "bold", mt: 4, mb: 2 }}
              >
                Sent Requests
              </Typography>
              <FriendRequestList requests={sentRequests} type="sent" />
            </Box>
          )}

          {view === "received" && (
            <FriendRequestList requests={receivedRequests} type="received" />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default FriendsPage;
