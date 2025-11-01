import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import PageWrapper from './PageWrapper.jsx';
import CssBaseline from '@mui/material/CssBaseline';

const MainLayout = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <PageWrapper>
        <Outlet /> {/* 2. Child pages (Chat, Friends) will be displayed here */}
      </PageWrapper>
    </>
  );
};
export default MainLayout;