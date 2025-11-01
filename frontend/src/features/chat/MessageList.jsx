import List from '@mui/material/List';
import Message from './Message.jsx';
import { useGetMeQuery } from '../../services/apiSlice';

// Displays a list of messages in a chat room
const MessageList = ({ messages }) => {
  const { data: currentUser } = useGetMeQuery();
  const currentUserId = currentUser?.id;

  return (
    <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
      {messages.map((msg, index) => (
        <Message
          key={msg.id || index}
          sender={msg.sender}
          text={msg.originalmessage} // API spec defines 'originalmessage'
          timestamp={msg.timestamp} // Using timestamp from API
          currentUserId={currentUserId}
        />
      ))}
    </List>
  );
};

export default MessageList;