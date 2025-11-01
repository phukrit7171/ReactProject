import { Box, Typography } from '@mui/material';

// Displays a single message with sender and timestamp
const Message = ({ sender, text, timestamp, currentUserId }) => {
  const isCurrentUser = sender?.id === currentUserId;
  const senderName = (typeof sender === 'object' && sender?.username) ? sender.username : sender;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        mb: 1,
        px: 1
      }}
    >
      <Box
        sx={{
          maxWidth: '75%',
          backgroundColor: isCurrentUser ? '#1976d2' : '#e0e0e0',
          color: isCurrentUser ? 'white' : 'black',
          borderRadius: '18px',
          padding: '10px 16px',
          wordWrap: 'break-word',
          wordBreak: 'break-word'
        }}
      >
        {!isCurrentUser && (
          <Typography 
            variant="caption" 
            sx={{ fontWeight: 'bold', color: '#1976d2', display: 'block' }}
          >
            {senderName || 'Sender'}
          </Typography>
        )}
        <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
          {text}
        </Typography>
        {timestamp && (
          <Typography 
            component="span" 
            variant="caption" 
            sx={{ display: 'block', textAlign: 'right', fontSize: '0.7rem', mt: 0.5, opacity: 0.8 }}
          >
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Message;