import React, { useState } from 'react';
import ChatRoomList from '../features/chat/ChatRoomList.jsx';
import ChatWindow from '../features/chat/ChatWindow.jsx';
import { Box } from '@mui/material';

// Main chat page with room selection and message display
const ChatPage = () => {
  // Manage the selected room ID state
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <ChatRoomList onSelectRoom={setSelectedRoomId} />
      <ChatWindow selectedRoomId={selectedRoomId} />
    </Box>
  );
};

export default ChatPage;