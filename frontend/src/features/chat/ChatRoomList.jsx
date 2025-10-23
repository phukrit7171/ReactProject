import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
// 1. Import the hook
import { useGetChatroomsQuery } from '../../services/apiSlice.js';

const ChatRoomList = ({ onSelectRoom }) => {
  // 2. Call the hook
  const {
    data: chatRooms = [], // Default to empty array
    isLoading,
    isError,
    error,
  } = useGetChatroomsQuery();

  // 3. Handle loading and error states
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Typography color="error">Error: {error.data?.message}</Typography>;

  return (
    <List sx={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
      <ListItem>
        <Typography variant="h6">Chat Rooms</Typography>
      </ListItem>
      {chatRooms.map((room) => (
        <ListItem
          button
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
        >
          {/* We need to know the *other* user's name, not the room id */}
          {/* This assumes the API returns a 'name' field for the room */}
          <ListItemText primary={room.name || `Room ${room.id}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatRoomList;