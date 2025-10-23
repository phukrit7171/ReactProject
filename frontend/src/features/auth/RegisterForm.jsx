import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// 1. Import the hook
import { useSignupMutation } from '../../services/apiSlice.js';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    originallang: '',
  });
  const navigate = useNavigate();

  // 2. Call the hook
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 3. Call the mutation
      await signup(formData).unwrap();
      // On success, navigate to login
      navigate('/login');
    } catch (err) {
      console.error('Failed to register:', err);
      // Error state is automatically handled by the hook
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: '0 auto', mt: 5 }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        disabled={isLoading}
        required
      />
      <TextField
        label="Original Language (e.g., th, en)"
        name="originallang"
        value={formData.originallang}
        onChange={handleChange}
        disabled={isLoading}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={isLoading}
        required
      />
      {/* 4. Display error from the hook */}
      {isError && (
        <Typography color="error" variant="body2" textAlign="center">
          {error.data?.message || 'Registration failed'}
        </Typography>
      )}
      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
};

export default RegisterForm;