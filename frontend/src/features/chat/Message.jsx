import { ListItem, ListItemText, Typography } from '@mui/material';

const Message = ({ sender, text, timestamp }) => {
  const senderName = (typeof sender === 'object' && sender?.username) ? sender.username : sender;

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={
          <Typography component="span" variant="body1" sx={{ fontWeight: 'bold' }}>
            {senderName || 'Sender'}
          </Typography>
        }
        secondary={
          <>
            {text}
            {timestamp && (
              <Typography component="span" variant="caption" sx={{ display: 'block', color: '#888', mt: 0.5 }}>
                {new Date(timestamp).toLocaleTimeString()}
              </Typography>
            )}
          </>
        }
      />
    </ListItem>
  );
};

export default Message;