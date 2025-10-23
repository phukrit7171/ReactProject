import { ListItem, ListItemText, Button, Box } from '@mui/material';

const FriendRequestItem = ({ request, onAccept, onDecline }) => {
  return (
    <ListItem
      secondaryAction={
        <Box>
          <Button onClick={() => onAccept(request.id)} sx={{ marginRight: '8px' }}>
            Accept
          </Button>
          <Button onClick={() => onDecline(request.id)} color="error">
            Decline
          </Button>
        </Box>
      }
    >
      <ListItemText primary={request.username || `Request ${request.id}`} />
    </ListItem>
  );
};

export default FriendRequestItem;