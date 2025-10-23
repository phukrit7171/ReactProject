import React, { useState } from 'react';
import ChatRoomList from '../features/chat/ChatRoomList.jsx';
import ChatWindow from '../features/chat/ChatWindow.jsx';
import { Box } from '@mui/material';

const ChatPage = () => {
  // 1. Manage the selected room ID state here
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}> {/* Example height */}
      {/* 2. Pass the setter to the list */}
      <ChatRoomList onSelectRoom={setSelectedRoomId} />
      
      {/* 3. Pass the ID to the window */}
      <ChatWindow selectedRoomId={selectedRoomId} />
    </Box>
  );
};

export default ChatPage;