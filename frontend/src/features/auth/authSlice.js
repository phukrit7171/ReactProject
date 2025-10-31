
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { saveToken, removeToken } from "../../utils/tokenStorage";

const API_URL = "http://localhost:3001/v1/auth"; // แก้ให้ตรงกับ backend Docker port

export const registerUser = createAsyncThunk(
  "v1/auth/register",
  async ({ username, password, originallang }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        username,
        password,
        originallang,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "v1/auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      saveToken(res.data.token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk("v1/auth/logout", async () => {
  removeToken();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
