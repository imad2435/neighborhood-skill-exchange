import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { profileApi } from "./api/profileApi";

const savedProfile = JSON.parse(localStorage.getItem("userProfile"));

// ---- Async Actions ----
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await profileApi.fetchProfile(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await profileApi.updateProfile(profileData);
      localStorage.setItem("userProfile", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadPortfolio = createAsyncThunk(
  "profile/uploadPortfolio",
  async (fileData, { rejectWithValue }) => {
    try {
      const newItem = await profileApi.uploadPortfolioItem(fileData);
      return newItem;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  Avatar Update 
export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async (fileUrl, { rejectWithValue }) => {
    try {
      const data = await profileApi.updateAvatar(fileUrl);
      // persist avatar in local storage
      const stored = JSON.parse(localStorage.getItem("userProfile")) || {};
      const updated = { ...stored, avatar: data };
      localStorage.setItem("userProfile", JSON.stringify(updated));
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ---- Slice ----
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: savedProfile || null,
    status: "idle",
    error: null,
  },
  reducers: {
    setRole: (state, action) => {
      if (state.user) state.user.role = action.payload;
      localStorage.setItem("userProfile", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Save
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Upload portfolio
      .addCase(uploadPortfolio.fulfilled, (state, action) => {
        state.user.portfolio.push(action.payload);
        localStorage.setItem("userProfile", JSON.stringify(state.user));
      })

      // ✅ Update Avatar
      .addCase(updateAvatar.fulfilled, (state, action) => {
        if (state.user) {
          state.user.avatar = action.payload;
        }
      });
  },
});

export const { setRole } = profileSlice.actions;
export default profileSlice.reducer;
