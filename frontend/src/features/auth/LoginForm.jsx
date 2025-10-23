import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// 1. Import hook จาก apiSlice
import { useLoginMutation } from '../../services/apiSlice.js';
import { storeToken } from '../../utils/tokenStorage.js'; //

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  // 2. เรียกใช้ mutation hook
  // RTK Query จะคืนค่า state ต่างๆ มาให้ (isLoading, isError, error)
  const [login, { isLoading, isError, error, isSuccess, data }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 3. เรียก mutation
      // .unwrap() จะคืนค่า response หรือ throw error
      const payload = await login(formData).unwrap();
      
      // 4. จัดการ response
      // payload คือ { token: '...' }
      storeToken(payload.token, true); // true for rememberMe
      navigate('/'); // ไปหน้า Chat หลัง login สำเร็จ
    } catch (err) {
      console.error('Login failed:', err);
      // 'error' state จาก hook จะถูกตั้งค่าอัตโนมัติ
    }
  };
  
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        required
        value={formData.username}
        onChange={handleChange}
        disabled={isLoading} // 5. ใช้ isLoading
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        required
        value={formData.password}
        onChange={handleChange}
        disabled={isLoading} // 5. ใช้ isLoading
      />
      {/* 6. แสดง Error อัตโนมัติ */}
      {isError && (
        <Typography color="error" variant="body2" textAlign="center">
          {error.data?.message || 'Login failed. Check credentials.'}
        </Typography>
      )}
      <Button 
        variant="contained" 
        color="primary" 
        type="submit"
        disabled={isLoading} // 5. ใช้ isLoading
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;