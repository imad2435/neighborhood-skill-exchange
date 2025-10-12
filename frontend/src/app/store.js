import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../redux/profileSlice";
import bookingsReducer from "../redux/bookingsSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
      bookings: bookingsReducer,
  },
});

export default store; 