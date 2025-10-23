// Main Redux store
// Centralized application state management
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice.js';
import { apiSlice } from '../services/apiSlice.js';

// Main Redux store configuration
// Combines all feature slices into a single store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  // Middleware of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;