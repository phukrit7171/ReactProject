import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Card, Input, Button } from '../common';
import { loginStart, loginSuccess, loginFailure } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApi';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginStart());
      try {
        const response = await loginUser(formData).unwrap();
        dispatch(loginSuccess(response));
        navigate('/chat');
      } catch (error) {
        const errorMessage = error?.data?.message || error?.error || 'Login failed. Please try again.';
        dispatch(loginFailure(errorMessage));
        setErrors({
          submit: errorMessage,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="Login">
        <Input
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          autoComplete="email"
          required
        />
        <Input
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          autoComplete="current-password"
          required
        />
        {errors.submit && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {errors.submit}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;