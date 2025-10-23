// Not found page component
// Displays when a user navigates to a non-existent route
import React from 'react';
// Import Material UI components for error display
import { Typography, Button } from '@mui/material';

// NotFoundPage component for 404 error handling
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" href="/">
        Go to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;