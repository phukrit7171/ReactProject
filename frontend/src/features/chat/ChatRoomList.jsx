import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, ListItem, ListItemText, ListItemButton, Box, Typography } from '@mui/material';
import { setActiveRoom } from '../chatSlice';

const ChatRoomList = () => {
  const dispatch = useDispatch();
  const { rooms, activeRoomId } = useSelector((state) => state.chat);

  const handleSelectRoom = (roomId) => {
    dispatch(setActiveRoom(roomId));
  };

  return (
    <Box sx={{ width: 300, bgcolor: 'background.paper', borderRight: '1px solid #e0e0e0' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6">Chat Rooms</Typography>
      </Box>
      <List>
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <ListItem key={room._id} disablePadding>
              <ListItemButton
                selected={room._id === activeRoomId}
                onClick={() => handleSelectRoom(room._id)}
              >
                <ListItemText 
                  primary={room.name || `Room ${room._id}`} 
                  secondary={room.lastMessage ? `${room.lastMessage.sender}: ${room.lastMessage.content}` : 'No messages yet'}
                />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No chat rooms found" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ChatRoomList;