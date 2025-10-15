import apiClient from './apiClient';

/**
 * Fetches all conversations for the currently logged-in user.
 * This is used to populate the conversation list in the sidebar.
 * @returns {Promise<Array>} A promise that resolves to an array of conversation objects.
 */
const getConversations = async () => {
  const response = await apiClient.get('/conversations');
  return response.data;
};

/**
 * Fetches the entire message history for a single, specific conversation.
 * This is called when a user clicks on a conversation to view it.
 * @param {string} conversationId - The ID of the conversation to fetch.
 * @returns {Promise<Array>} A promise that resolves to an array of message objects.
 */
const getMessagesForConversation = async (conversationId) => {
  const response = await apiClient.get(`/conversations/${conversationId}`);
  return response.data;
};

/**
 * Creates a new conversation with another user if one doesn't already exist.
 * If a conversation already exists between the two users, it returns the existing one.
 * This is useful for a "Start Chat" button on a provider's profile page.
 * @param {string} receiverId - The user ID of the person to start a chat with.
 * @returns {Promise<Object>} A promise that resolves to a conversation object.
 */
const createOrGetConversation = async (receiverId) => {
  const response = await apiClient.post('/conversations', { receiverId });
  return response.data;
};

// Export all functions as a single object for easy importing.
export const messagesApi = {
  getConversations,
  getMessagesForConversation,
  createOrGetConversation,
};