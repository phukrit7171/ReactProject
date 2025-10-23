import React from "react";
import { Box, Typography } from "@mui/material";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";
// 1. Import the hooks
import {
  useGetMessagesByRoomQuery,
  useSendMessageMutation,
} from "../../services/apiSlice.js";

const ChatWindow = ({ selectedRoomId }) => {
  // 2. Call the query hook.
  // We use `skip` to prevent fetching if no room is selected.
  // We also use `pollingInterval` to refetch messages every 3 seconds (as per your workflow)
  const {
    data: messages = [],
    isLoading,
    isError,
    error,
  } = useGetMessagesByRoomQuery(
    { id: selectedRoomId, filter: "received" },
    {
      skip: !selectedRoomId,
      pollingInterval: 3000, // Polls every 3 seconds
    }
  );

  // 3. Call the mutation hook
  const [sendMessage] = useSendMessageMutation();

  const handleSendMessage = async (messageText) => {
    if (!selectedRoomId) return;

    try {
      // 4. Call the mutation
      await sendMessage({
        roomid: selectedRoomId,
        originalmessage: messageText,
      }).unwrap();
      // Note: We don't need to manually refetch.
      // The poll will pick it up, or we could use 'invalidatesTags' in apiSlice.
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // 5. Handle different states
  if (!selectedRoomId) {
    return (
      <Box sx={{ flex: 1, display: "grid", placeItems: "center" }}>
        <Typography>Select a chat room to start messaging</Typography>
      </Box>
    );
  }

  // 6. Error state
  if (isError) {
    return (
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center' }}>
        <ErrorMessage message={error?.data?.message || 'Failed to load messages'} />
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
