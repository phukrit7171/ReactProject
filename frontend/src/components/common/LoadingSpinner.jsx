// Loading spinner component
// Displays a loading indicator while data is being fetched or processed
import React from 'react';
// Import Material UI CircularProgress component or similar
import CircularProgress from '@mui/material/CircularProgress';

// LoadingSpinner component for indicating loading states
// Provides consistent loading indicator throughout the application
const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;