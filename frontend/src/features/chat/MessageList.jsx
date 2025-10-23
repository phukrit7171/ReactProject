// Message list component
// Displays a list of messages in a chat conversation
import React from 'react';
// Import Material UI components for list display
import List from '@mui/material/List';

// MessageList component to show all messages in a chat
// Contains multiple Message components
const MessageList = ({ messages }) => {
  return (
    <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </List>
  );
};

export default MessageList;