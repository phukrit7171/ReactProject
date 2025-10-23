// Friend list component
// Displays a list of the user's friends
import React from 'react';
// Import Material UI components for list display
import List from '@mui/material/List';
import Button from '@mui/material/Button';
// FriendList component to show user's friends
// Contains multiple FriendListItem components
const FriendList = ({ friends, onStartChat = () => {} }) => {
  const handleSelectFriend = (friendId) => {
    onStartChat(friendId);
  };
  return (
    <List>
      {friends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onSelect={() => handleSelectFriend(friend.userid)}
        />
      ))}
    </List>
  );
};

export default FriendList;