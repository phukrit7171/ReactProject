import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  IconButton,
  Divider
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { addMessage } from '../chatSlice';
import { useGetMessagesByChatroomQuery, useSendMessageMutation } from './messagesApi';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { activeRoomId, messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState('');
  const [sendMessage] = useSendMessageMutation();
  const messagesEndRef = useRef(null);

  const { data: roomMessages, isLoading, refetch } = useGetMessagesByChatroomQuery(activeRoomId, {
    skip: !activeRoomId,
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (message.trim() && activeRoomId) {
      try {
        await sendMessage({ originalmessage: message, roomid: activeRoomId }).unwrap();
        setMessage('');
        refetch(); // Refresh messages after sending
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const allMessages = roomMessages || [];

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6">Chat Room</Typography>
      </Box>
      
      <Paper 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isLoading ? (
          <Typography>Loading messages...</Typography>
        ) : allMessages.length > 0 ? (
          <>
            <List>
              {allMessages.map((msg) => (
                <ListItem 
                  key={msg._id} 
                  alignItems="flex-start"
                  sx={{ 
                    justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                    py: 1
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: msg.sender === 'me' ? 'primary.main' : 'grey.200',
                      color: msg.sender === 'me' ? 'white' : 'text.primary',
                    }}
                  >
                    <ListItemText
                      primary={msg.content}
                      secondary={new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      primaryTypographyProps={{ 
                        style: { wordWrap: 'break-word' } 
                      }}
                      secondaryTypographyProps={{ 
                        style: { fontSize: '0.7rem', opacity: 0.8 } 
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            <div ref={messagesEndRef} />
          </>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        )}
      </Paper>
      
      <Paper 
        sx={{ 
          p: 2, 
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          variant="outlined"
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          sx={{ flex: 1, mr: 1 }}
        />
        <IconButton 
          color="primary" 
          onClick={handleSendMessage}
          disabled={!message.trim() || !activeRoomId}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default ChatWindow;