// Navigation bar component
// Provides consistent navigation across all pages of the application
import React from 'react';
// Import Material UI components for the navbar
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

// Navbar component function
// Creates a consistent navigation bar for the application
const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          My Application
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {/* Additional navigation items can be added here */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;