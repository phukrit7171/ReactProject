// Login form component
// Provides a form for users to log into the application
import React from 'react';
// Import Material UI components for form elements
import { TextField, Button, Box } from '@mui/material';

// LoginForm component for user authentication
// Collects username/email and password for login
const LoginForm = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '300px',
        margin: '0 auto',
        mt: 5,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Username or Email" variant="outlined" required />
      <TextField label="Password" type="password" variant="outlined" required />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;