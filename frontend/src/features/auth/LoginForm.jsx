import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useLoginMutation } from "../../services/apiSlice";
import { saveToken } from "../../utils/tokenStorage";
import { useNavigate } from "react-router-dom";

// Login form component for user authentication
export default function LoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading: loading, error }] = useLoginMutation();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      // save token and navigate to home page
      if (res?.token) saveToken(res.token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
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
          Sign in
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
            Sign in
          </Button>

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {typeof error === "string"
                ? error
                : error?.data?.error ?? JSON.stringify(error)}
            </Typography>
          )}

          <Typography variant="body2" mt={2}>
            Don't have an account?{" "}
            <span
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
