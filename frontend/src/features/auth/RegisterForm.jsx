
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";

import { useSignupMutation } from "../../services/apiSlice";
import { useNavigate } from "react-router-dom";

// Registration form for new users
export default function RegisterForm() {
  const navigate = useNavigate();
  const [signup, { isLoading: loading, error }] = useSignupMutation();

  const [form, setForm] = useState({
    username: "",
    password: "",
    originallang: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form).unwrap();
      // On successful signup, navigate to login page
      navigate("/login");
    } catch (err) {
      // error will be shown from `error` returned by the mutation
      console.error("Signup error:", err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: 350, borderRadius: "16px", textAlign: "center" }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Sign up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Original language"
            name="originallang"
            value={form.originallang}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Thai">Thai</MenuItem>
            <MenuItem value="Chinese">Chinese</MenuItem>
          </TextField>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "orange",
              color: "white",
              borderRadius: "25px",
              "&:hover": { bgcolor: "#e69500" },
            }}
            disabled={loading}
          >
            Sign up
          </Button>

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {typeof error === "string"
                ? error
                : error?.data?.error ?? JSON.stringify(error)}
            </Typography>
          )}

          <Typography variant="body2" mt={2}>
            Have an account?{" "}
            <span
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
