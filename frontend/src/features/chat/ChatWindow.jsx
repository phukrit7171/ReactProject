import React from "react";
import { Box, Typography } from "@mui/material";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
import {
  useGetMessagesByRoomQuery,
  useSendMessageMutation,
} from "../../services/apiSlice.js";

// Displays messages in a selected chat room with input functionality
const ChatWindow = ({ selectedRoomId }) => {
  // Fetch messages for the selected room
  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useGetMessagesByRoomQuery(
    { id: selectedRoomId },
    {
      skip: !selectedRoomId,
    }
  );

  // Mutation hook for sending messages
  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async (messageText) => {
    if (!selectedRoomId) return;

    try {
      // Send the message to the selected room
      await sendMessage({
        roomid: selectedRoomId,
        originalmessage: messageText,
      }).unwrap();
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Handle case when no room is selected
  if (!selectedRoomId) {
    return (
      <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
        <Typography>Select a chat room to start messaging</Typography>
      </Box>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <Typography color="error">Error: {error?.data?.message || 'Failed to load messages'}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {isLoading ? <LoadingSpinner /> : <MessageList messages={messages} />}
      </Box>
      <Box sx={{ padding: "16px", borderTop: "1px solid #ccc" }}>
        <MessageInput onSend={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default ChatWindow;
