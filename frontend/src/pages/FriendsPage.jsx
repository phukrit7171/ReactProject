// Friends page component
// Main page for friend management, containing friend lists and requests
import React from 'react';
// Import friends components
import FriendList from '../features/friends/FriendList.jsx';
import FriendRequestList from '../features/friends/FriendRequestList.jsx';

// FriendsPage component for the main friends interface
const FriendsPage = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <FriendRequestList />
      <FriendList />
    </div>
  );
};

export default FriendsPage;