// Settings form component
// Allows users to update their profile settings and preferences
import React from 'react';
// Import Material UI components for form elements
import { TextField, Button, Box } from '@mui/material';

// SettingsForm component for user profile management
// Provides fields for updating user information and preferences
const SettingsForm = () => {
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '400px',
                margin: '0 auto',
                mt: 5,
            }}
            noValidate
            autoComplete="off"
        >
            <TextField label="Full Name" variant="outlined" required />
            <TextField label="Email" type="email" variant="outlined" required />
            <TextField label="Username" variant="outlined" required />
            <Button variant="contained" color="primary" type="submit">
                Save Settings
            </Button>
        </Box>
    );
};

export default SettingsForm;