// Registration form component
// Provides a form for users to create new accounts
import React from 'react';
// Import Material UI components for form elements
import { TextField, Button, Box } from '@mui/material';

// RegisterForm component for user account creation
// Collects user information for registration
const RegisterForm = () => {
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
      <TextField label="Username" variant="outlined" required />
      <TextField label="Email" type="email" variant="outlined" required />
      <TextField label="Password" type="password" variant="outlined" required />
      <Button variant="contained" color="primary" type="submit">
        Register
      </Button>
    </Box>
  );
};
export default RegisterForm;