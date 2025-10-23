// Chat page component
// Main page for chat functionality, containing chat rooms and messaging
import React from 'react';
// Import chat components
import ChatRoomList from '../features/chat/ChatRoomList.jsx';
import ChatWindow from '../features/chat/ChatWindow.jsx';

// ChatPage component for the main chat interface
const ChatPage = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <ChatRoomList />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;