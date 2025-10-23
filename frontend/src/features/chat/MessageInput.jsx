// Message input component
// Provides an input field for sending new messages in chat
import React from 'react';
// Import Material UI components for input
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// MessageInput component for sending chat messages
// Allows users to type and send messages in a chat
const MessageInput = ({ onSend }) => {
  const [message, setMessage] = React.useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default MessageInput;