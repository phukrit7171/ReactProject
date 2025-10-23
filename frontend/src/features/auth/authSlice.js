import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../../services/apiSlice.js';
import { getToken } from '../../utils/tokenStorage.js';

// Read token from storage on initial load
const token = getToken();

const initialState = {
  isAuthenticated: !!token, // Set initial auth state based on token
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Reducers for actions we dispatch manually
  reducers: {
    // We'll use this if we manually clear the token (e.g., on 401 error)
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  // extraReducers to "listen" for actions from other slices (like apiSlice)
  extraReducers: (builder) => {
    // When login is successful
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        // payload from login is { token: '...' }
        state.isAuthenticated = true;
        // Note: The token is saved in LoginForm, not in the Redux state
      }
    );
    // When getMe is successful
    builder.addMatcher(
      apiSlice.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        // payload from getMe is the user object
        state.isAuthenticated = true;
        state.user = payload;
      }
    );
    // When logout is successful OR getMe fails (e.g., 401)
    builder.addMatcher(
      apiSlice.endpoints.logout.matchFulfilled,
      (state) => {
        state.isAuthenticated = false;
        state.user = null;
      }
    );
    builder.addMatcher(
      apiSlice.endpoints.getMe.matchRejected,
      (state, { payload }) => {
        if (payload?.status === 401) {
          state.isAuthenticated = false;
          state.user = null;
        }
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;