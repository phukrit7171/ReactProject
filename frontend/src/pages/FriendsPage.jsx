import React, { useState } from 'react';
import FriendList from '../features/friends/FriendList';
import FriendRequests from '../features/friends/FriendRequests';
import AddFriend from '../features/friends/AddFriend';
import Button from '../components/common/Button';

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState('friends');

  const tabs = [
    { id: 'friends', label: 'Friends' },
    { id: 'requests', label: 'Friend Requests' },
    { id: 'add', label: 'Add Friend' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'friends':
        return <FriendList />;
      case 'requests':
        return <FriendRequests />;
      case 'add':
        return <AddFriend />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'secondary'}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default FriendsPage;