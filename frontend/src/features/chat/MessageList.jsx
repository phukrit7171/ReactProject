import { Box } from '@mui/material';
import Message from './Message.jsx';
import { useGetMeQuery } from '../../services/apiSlice';

// Displays a list of messages in a chat room
const MessageList = ({ messages }) => {
  const { data: currentUser } = useGetMeQuery();
  const currentUserId = currentUser?.id;

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      {messages.map((msg, index) => {
        // If current user is the sender, show original message; otherwise show translated message
        const isCurrentUserSender = msg.sender?.id === currentUserId || msg.senderId === currentUserId;
        const displayText = isCurrentUserSender ? msg.originalmessage : msg.translatemessage;
        
        return (
          <Message
            key={msg.id || index}
            sender={msg.sender}
            text={displayText}
            timestamp={msg.timestamp} // Using timestamp from API
            currentUserId={currentUserId}
          />
        );
      })}
    </Box>
  );
};

export default MessageList;