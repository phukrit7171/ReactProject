
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";

const store = configureStore({
  reducer: {
    // RTK Query API reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
