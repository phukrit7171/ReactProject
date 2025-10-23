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
        <Outlet /> {/* 2. หน้าลูก (Chat, Friends) จะมาแสดงผลตรงนี้ */}
      </PageWrapper>
    </>
  );
};
export default MainLayout;