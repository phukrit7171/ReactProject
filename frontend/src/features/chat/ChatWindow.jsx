// Chat window component
// Main interface for participating in a chat conversation
import React from 'react';
// Import chat components
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';

// ChatWindow component for a single chat conversation
// Contains message display area and input field
const ChatWindow = ({ messages, onSendMessage }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        <MessageList messages={messages} />
      </div>
      <div style={{ padding: '16px', borderTop: '1px solid #ccc' }}>
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;