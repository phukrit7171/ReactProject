import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const DashboardPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">
          Welcome to your dashboard! This is where you can view your activity and manage your account.
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardPage;