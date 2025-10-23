// Chat room list component
// Displays a list of available chat rooms for the user
import React from 'react';
// Import Material UI components for list display
import List from '@mui/material/List';

// ChatRoomList component to show available chat rooms
// Allows users to select a chat room to join
const ChatRoomList = ({ chatRooms, onSelectRoom }) => {
  return (
    <List>
      {chatRooms.map((room) => (
        <div
          key={room.id}
          style={{ padding: '8px', cursor: 'pointer' }}
          onClick={() => onSelectRoom(room.id)}
        >
          {room.name}
        </div>
      ))}
    </List>
  );
};

export default ChatRoomList;