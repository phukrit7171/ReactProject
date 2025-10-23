import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { useGetChatroomsQuery } from '../../services/apiSlice.js';
import { ListItemButton } from '@mui/material';

const ChatRoomList = ({ onSelectRoom }) => {
  const {
    data: chatRooms = [],
    isLoading,
    isError,
    error,
  } = useGetChatroomsQuery();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <Typography color="error">Error: {error.data?.message}</Typography>;

  return (
    <List sx={{ width: '30%', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
      <ListItem>
        <Typography variant="h6">Chat Rooms</Typography>
      </ListItem>
      {chatRooms.map((room) => (
        <ListItemButton
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
        >
          <ListItemText primary={room.name || `Room ${room.id}`} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default ChatRoomList;