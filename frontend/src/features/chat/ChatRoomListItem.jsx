// Chat room list item component
// Represents a single chat room in the chat room list
import React from 'react';
// Import Material UI components for list items
import ListItem from '@mui/material/ListItem';

// ChatRoomListItem component for individual chat room display
// Shows chat room name, last message, and other relevant information
const ChatRoomListItem = ({ room, onSelect }) => {
  return (
    <ListItem
      button
      onClick={() => onSelect(room.id)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <strong>{room.name}</strong>
      <span style={{ fontSize: '0.9em', color: '#666' }}>
        {room.lastMessage ? `${room.lastMessage.sender}: ${room.lastMessage.text}` : 'No messages yet'}
      </span>
    </ListItem>
  );
};

export default ChatRoomListItem;