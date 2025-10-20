import React from 'react';
import { useSelector } from 'react-redux';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { useGetFriendStatusQuery } from '../friends/friendsApi';

const FriendList = () => {
  const { data: friends, isLoading, error } = useGetFriendStatusQuery();

  if (isLoading) return <div>Loading friends...</div>;
  if (error) return <div>Error loading friends: {error.message}</div>;

  const friendList = friends?.friends || [];

  return (
    <div>
      <h2>Friends ({friendList.length})</h2>
      {friendList.length > 0 ? (
        <List>
          {friendList.map((friend) => (
            <ListItem key={friend._id}>
              <ListItemAvatar>
                <Avatar>
                  {friend.name?.charAt(0) || 'U'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={friend.name || friend.email} 
                secondary={friend.email}
              />
              <Button variant="outlined" size="small">Message</Button>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>You don't have any friends yet.</p>
      )}
    </div>
  );
};

export default FriendList;