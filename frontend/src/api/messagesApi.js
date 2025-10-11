
import apiClient from "./apiClient";


export const messagesApi = {
  getConversations: async () => {
    const res = await apiClient.get("/conversations");
    return res.data;
  },

  getConversationById: async (id) => {
    const res = await apiClient.get(`/conversations/${id}`);
    return res.data;
  },

  sendMessage: async (chatId, message) => {
    const res = await apiClient.post(`/messages/${chatId}`, message);
    return res.data;
  },
};
