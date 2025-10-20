import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Alert
} from '@mui/material';
import { updateUser } from '../auth/authSlice';
import { useUpdateUserMutation } from './usersApi';

const SettingsForm = ({ user }) => {
  const dispatch = useDispatch();
  const [updateUserApi, { isLoading, error }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserApi({ id: user._id, ...formData }).unwrap();
      dispatch(updateUser(response));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Account Settings
        </Typography>
        
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Profile updated successfully!
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.data?.message || error.error || 'Failed to update profile'}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <TextField
            name="bio"
            label="Bio"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SettingsForm;