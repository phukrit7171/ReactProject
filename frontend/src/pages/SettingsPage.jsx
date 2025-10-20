import React from 'react';
import { useSelector } from 'react-redux';
import SettingsForm from '../features/users/SettingsForm';

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <SettingsForm user={user} />
    </div>
  );
};

export default SettingsPage;