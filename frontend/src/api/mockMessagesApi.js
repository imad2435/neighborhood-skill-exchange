export const mockMessagesApi = {
  getConversations: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            participants: ["seeker_john", "provider_anna"],
            messages: [
              { senderId: "seeker_john", text: "Hello!", time: new Date().toISOString() },
              { senderId: "provider_anna", text: "Hi there!", time: new Date().toISOString() },
            ],
          },
          {
            id: "2",
            participants: ["seeker_mary", "provider_bob"],
            messages: [
              { senderId: "seeker_mary", text: "Are you available tomorrow?", time: new Date().toISOString() },
              { senderId: "provider_bob", text: "Yes, I am.", time: new Date().toISOString() },
            ],
          },
        ]);
      }, 500);
    });
  },
  sendMessage: async (chatId, message) => {
    return new Promise((resolve) => setTimeout(() => resolve(message), 200));
  },
};
