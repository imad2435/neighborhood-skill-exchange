import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Async thunks for bookings
export const createBooking = createAsyncThunk(
  "bookings/createBooking",
  async ({ providerId, bookingData, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${API_BASE_URL}/bookings/${providerId}`,
        bookingData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  "bookings/fetchMyBookings",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userToken }, // Get userToken from auth slice
      } = getState();

      if (!userToken) {
        return rejectWithValue("No authentication token found.");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(`${API_BASE_URL}/bookings/mybookings`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  "bookings/updateBookingStatus",
  async ({ bookingId, status, token }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `${API_BASE_URL}/bookings/${bookingId}/status`,
        { status },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    seekerBookings: [],
    providerRequests: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBookingSuccess: (state) => {
      state.success = false;
    },
    resetBookingError: (state) => {
      state.error = null;
    },
    clearBookings: (state) => { // New reducer to clear bookings on logout
      state.seekerBookings = [];
      state.providerRequests = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // The backend `createBooking` adds to bookings, but for now we'll push to seekerBookings assuming
        // the user creating is a seeker. In a real app, you might re-fetch or rely on the backend response
        // for comprehensive state update.
        state.seekerBookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Bookings
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        // The backend's `getMyBookings` returns bookings relevant to the user's role.
        // So, we can directly assign them, assuming `action.payload` contains the correct set.
        // For accurate distinction, we'd need to know the user's role here,
        // or have two separate endpoints/responses from the backend.
        // Given the current backend `getMyBookings` logic:
        // if userRole is provider, it fetches serviceProvider bookings.
        // if userRole is seeker, it fetches serviceSeeker bookings.
        // So `action.payload` will contain only one type of booking for the current user.
        // We'll update both, and let components pick the relevant one.
        // A better approach would be to pass the role or have specific fetch thunks for seeker/provider.

        // However, for simplicity and to match the existing component logic (which filters based on user role):
        // We need the user's role to correctly categorize the fetched bookings.
        // This is a common pattern where you'd merge data based on multiple sources in Redux.
        // For now, let's assume `action.payload` is an array of bookings, and the component will filter.
        // Or, more accurately, we need to know the user's role *here* to set the correct state.
        // A quick fix is to get the user from `getState()` as well.

        const { auth: { user } } = getState();
        if (user?.role === 'provider') {
            state.providerRequests = action.payload;
            state.seekerBookings = []; // Clear seeker bookings if acting as provider
        } else { // Default to seeker if role is not provider or is seeker
            state.seekerBookings = action.payload;
            state.providerRequests = []; // Clear provider requests if acting as seeker
        }
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Booking Status
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update the status in providerRequests
        state.providerRequests = state.providerRequests.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        );
        // Also update in seekerBookings if applicable (e.g., if a seeker is viewing their request)
        state.seekerBookings = state.seekerBookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        );
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBookingSuccess, resetBookingError, clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;