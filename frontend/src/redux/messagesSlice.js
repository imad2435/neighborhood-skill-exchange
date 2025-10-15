import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { messagesApi } from '../api/messagesApi';

// Async thunk to fetch the list of conversations for the sidebar.
export const fetchConversations = createAsyncThunk(
  'messages/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      return await messagesApi.getConversations();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch conversations');
    }
  }
);

// Async thunk to fetch the message history for a selected conversation.
export const fetchMessagesForConversation = createAsyncThunk(
  'messages/fetchMessages',
  async (conversationId, { rejectWithValue }) => {
    try {
      const messages = await messagesApi.getMessagesForConversation(conversationId);
      // Return both the messages and the ID so we know where to store them.
      return { conversationId, messages };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
);
export const createOrGetConversationAsync = createAsyncThunk(
  'messages/createOrGetConversation',
  async (receiverId, { rejectWithValue }) => {
    try {
      const conversation = await messagesApi.createOrGetConversation(receiverId);
      return conversation;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to start conversation');
    }
  }
)

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    conversations: [],
    messagesByConversationId: {}, // Stores message history, e.g., { 'convo123': [...] }
    activeChatId: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Sets the currently active chat in the UI.
    setActiveChat: (state, action) => {
      state.activeChatId = action.payload;
    },
    // This reducer is called when a new message arrives from the socket.
    addMessage: (state, action) => {
      const message = action.payload;
      const { conversationId } = message;
      // Add the new message to the correct conversation's message history.
      if (state.messagesByConversationId[conversationId]) {
        state.messagesByConversationId[conversationId].push(message);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetching the conversation list
      .addCase(fetchConversations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Reducers for fetching a conversation's message history
      .addCase(fetchMessagesForConversation.fulfilled, (state, action) => {
        const { conversationId, messages } = action.payload;
        state.messagesByConversationId[conversationId] = messages;
      });
  },
});

export const { setActiveChat, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;