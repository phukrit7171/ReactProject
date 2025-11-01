import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper, MenuItem } from '@mui/material';
import { useGetMeQuery, useUpdateUserMutation } from '../../services/apiSlice.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';

// Form for updating user profile settings
const SettingsForm = () => {
  // Using refetchOnMountOrArgChange to ensure fresh data when switching accounts
  const { data: currentUser, isLoading: isLoadingMe, isError, error, refetch } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateUser, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
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

  // Refetch user data when component mounts to ensure we have the current user
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currentUser?.id || currentUser?._id || currentUser?.userid;
    if (!userId) {
      console.error('No user ID found in currentUser:', currentUser);
      return alert('User data not loaded yet. Please wait.');
    }

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

      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          mb: 2, 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="body1">
          <strong>Your User ID:</strong>
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'monospace', 
            backgroundColor: '#e0e0e0', 
            p: 1, 
            borderRadius: 1,
            wordBreak: 'break-all'
          }}
        >
          {currentUser?.id || currentUser?.userid || 'Loading...'}
        </Typography>
      </Paper>

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        disabled={isUpdating}
        required
      />

      <TextField
        select
        label="Original Language"
        name="originallang"
        value={formData.originallang}
        onChange={handleChange}
        disabled={isUpdating}
        required
      >
        <MenuItem value="English">English</MenuItem>
        <MenuItem value="Thai">Thai</MenuItem>
      </TextField>

      {successMessage && (
        <Alert severity="success" sx={{ textAlign: 'center' }}>
          {successMessage}
        </Alert>
      )}

      {isUpdateError && (
        <Alert severity="error" sx={{ textAlign: 'center' }}>
          {updateError?.data?.message || 'Failed to save settings. Please try again.'}
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
