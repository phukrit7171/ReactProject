import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
// 1. Import the hooks
import { useGetMeQuery, useUpdateUserMutation } from '../../services/apiSlice.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const SettingsForm = () => {
  // 2. Call the query hook to get current user data
  const { data: currentUser, isLoading: isLoadingMe, isError } = useGetMeQuery();

  // 3. Call the mutation hook for updating
  const [updateUser, { isLoading: isUpdating, isSuccess }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    username: '',
    originallang: '',
  });

  // 4. Populate form when 'currentUser' data arrives
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        originallang: currentUser.originallang,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 5. Call the mutation
      await updateUser({ id: currentUser.id, ...formData }).unwrap();
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  };

  // 6. Handle loading and error states
  if (isLoadingMe) return <LoadingSpinner />;
  if (isError) return <Typography color="error">Error loading user data.</Typography>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '400px', margin: '0 auto', mt: 5 }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        disabled={isUpdating}
        required
      />
      <TextField
        label="Original Language (e.g., th, en)"
        name="originallang"
        value={formData.originallang}
        onChange={handleChange}
        disabled={isUpdating}
        required
      />
      {isSuccess && (
        <Typography color="primary" variant="body2" textAlign="center">
          Settings saved successfully!
        </Typography>
      )}
      <Button variant="contained" color="primary" type="submit" disabled={isUpdating}>
        {isUpdating ? 'Saving...' : 'Save Settings'}
      </Button>
    </Box>
  );
};

export default SettingsForm;