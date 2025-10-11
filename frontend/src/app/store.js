import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../redux/profileSlice";
import messagesReducer from "../redux/messagesSlice"; 
export const store = configureStore({
  reducer: {
    profile: profileReducer,
      messages: messagesReducer,
  },
});

export default store; 