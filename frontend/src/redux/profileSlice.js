import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Use a default import because profileApi.js uses a default export
import profileApi from "../api/profileApi"; 

// ---- Async Thunks (Actions that can perform async operations) ----

// Fetches the profile of the currently logged-in user
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => { // No userId needed, it uses the token
    try {
      // Correctly calls the getMyProfile function from our real API service
      const data = await profileApi.getMyProfile();
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch profile";
      return rejectWithValue(message);
    }
  }
);

// Saves (creates or updates) the user's profile
export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await profileApi.createOrUpdateProfile(profileData);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to save profile";
      return rejectWithValue(message);
    }
  }
);

// NOTE: The uploadPortfolio and updateAvatar thunks are still using the old mock API.
// We can leave them for now and connect them to a real backend later if needed.
export const uploadPortfolio = createAsyncThunk(
  "profile/uploadPortfolio",
  async (fileData, { rejectWithValue }) => { /* ... mock logic ... */ }
);
export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async (fileUrl, { rejectWithValue }) => { /* ... mock logic ... */ }
);


// ---- The Slice Definition ----
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null, // Start with no user data
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  // Reducers for synchronous actions
  reducers: {
    // This reducer is for the role switcher component (for demo/testing purposes)
    setRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
  },
  // Handles the state changes for our async thunks
  extraReducers: (builder) => {
    builder
      // Cases for fetching the profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // The payload from getMyProfile is the user's PROFILE, which contains the user object
        // The existing frontend components might expect the data in a different shape.
        // For now, let's assume the component wants the `profile` object.
        state.user = action.payload.user; // Or just action.payload if the component is updated
        state.user.profileDetails = action.payload; // Store the full profile details
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Cases for saving the profile
      .addCase(saveProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user.profileDetails = action.payload; // Update profile details on successful save
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


// ---- Exports ----

// Export the synchronous action creators
export const { setRole } = profileSlice.actions;

// Export the reducer to be used in the store
export default profileSlice.reducer;