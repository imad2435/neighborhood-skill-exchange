

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const profileApi = {
  async fetchProfile(userId) {
    // replace with: await fetch(`${API_BASE_URL}/users/${userId}`)
    return Promise.resolve({
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "provider",
      verified: true,
      hourlyRate: 25,
      dailyRate: 150,
      availability: "Weekdays 9am–6pm",
      portfolio: [],
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=8b5cf6&color=fff",
    });
  },

  async updateProfile(data) {
    // POST or PATCH request later
    console.log("Mock updateProfile:", data);
    return Promise.resolve(data);
  },

  async uploadPortfolioItem(fileData) {
    console.log("Mock uploadPortfolio:", fileData);
    // In real backend, upload file to server here
    return Promise.resolve({
      id: Date.now(),
      url: fileData.url,
    });
  },

  async updateAvatar(fileUrl) {
    console.log("Mock updateAvatar:", fileUrl);
    return Promise.resolve(fileUrl);
  },
};
