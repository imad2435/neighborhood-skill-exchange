
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { messagesApi } from "../api/messagesApi";

import { mockMessagesApi } from "../api/mockMessagesApi";//mock Data

const api = mockMessagesApi; // replace with messagesApi when backend is ready


export const fetchConversations = createAsyncThunk(
  "messages/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      return await api.getConversations();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch conversations");
    }
  }
);

export const sendMessageAsync = createAsyncThunk(
  "messages/sendMessage",
  async ({ chatId, sender, text }, { rejectWithValue }) => {
    try {
      const message = {
        senderId: sender,
        text,
        time: new Date().toISOString(),
      };
      const res = await api.sendMessage(chatId, message);
      return { chatId, message: res };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to send message");
    }
  }
);

// --- Slice ---
const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    conversations: [],
    activeChatId: null,
    loading: false,
    error: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        const { chatId, message } = action.payload;
        const chat = state.conversations.find((c) => c.id === chatId);
        if (chat) chat.messages.push(message);
      });
  },
});

export const { setActiveChat } = messagesSlice.actions;
export default messagesSlice.reducer;
