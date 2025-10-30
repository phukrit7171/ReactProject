import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useGetMeQuery, useUpdateUserMutation } from '../../services/apiSlice.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

const SettingsForm = () => {
  const { data: currentUser, isLoading: isLoadingMe, isError, error } = useGetMeQuery();
  const [updateUser, { isLoading: isUpdating, isSuccess, isError: isUpdateError, error: updateError }] =
    useUpdateUserMutation();

  const [formData, setFormData] = useState({ username: '', originallang: '' });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || '',
        originallang: currentUser.originallang || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = currentUser?.id || currentUser?._id || currentUser?.userid; // ✅ เพิ่มกรณีนี้
  if (!userId) {
    console.error('No user ID found in currentUser:', currentUser);
    return alert('User data not loaded yet. Please wait.');
  }

  console.log("Submitting update for user:", currentUser);

  try {
    await updateUser({ id: userId, ...formData }).unwrap();
    setSuccessMessage('Settings saved successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  } catch (err) {
    console.error('Failed to update settings:', err);
  }
};


  if (isLoadingMe) return <LoadingSpinner />;
  if (isError) {
    console.error('Failed to load user:', error);
    return <Typography color="error">Error loading user data. Please refresh.</Typography>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '400px',
        margin: '0 auto',
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        ⚙️ User Settings
      </Typography>

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

      {successMessage && (
        <Alert severity="success" sx={{ textAlign: 'center' }}>
          {successMessage}
        </Alert>
      )}

      {isUpdateError && (
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          {updateError?.data?.message || ' Failed to save settings. Please try again.'}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isUpdating || !currentUser}
      >
        {isUpdating ? 'Saving...' : 'Save Settings'}
      </Button>
    </Box>
  );
};

export default SettingsForm;
