import List from '@mui/material/List';
import Message from './Message.jsx';

const MessageList = ({ messages }) => {
  return (
    <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
      {messages.map((msg, index) => (
        <Message
          key={msg.id || index}
          sender={msg.sender}
          text={msg.originalmessage} // API spec define 'originalmessage'
          timestamp={msg.createdAt} // May be 'timestamp' or 'createdAt'
        />
      ))}
    </List>
  );
};

export default MessageList;