import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout
import MainLayout from './components/layout/MainLayout.jsx'; // <--- Import Layout ใหม่
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';

// Import Pages
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* === 1. Route ที่อยู่นอก Layout === */}
        {/* (ไม่จำเป็นต้องมี CssBaseline ที่นี่ เพราะ MainLayout มีแล้ว) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* === 2. Route ที่อยู่ข้างใน Layout === */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute> {/* หุ้มด้วยตัวเช็คล็อกอิน */}
              <MainLayout /> {/* หุ้มด้วย Layout (Navbar+Wrapper) */}
            </ProtectedRoute>
          }
        >
          {/* หน้าย่อยเหล่านี้จะไปแทนที่ <Outlet /> */}
          <Route index element={<ChatPage />} /> {/* path="/" (หน้าแรก) */}
          <Route path="friends" element={<FriendsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default App;