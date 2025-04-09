import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("No access token available");

    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }); 
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || "Failed to fetch users",
            status: error.response?.status || 500
        });
    }
});

// Fetch user profile
export const fetchUserProfile = createAsyncThunk("users/fetchUserProfile", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("No access token available");

    try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }); 
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || "Failed to fetch user profile",
            status: error.response?.status || 500
        });
    }
});

// Update user
export const updateUser = createAsyncThunk("users/updateUser", async ({ id, userData }, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return rejectWithValue("No access token available");

    try {
        const response = await axios.put(`${BASE_URL}/user/${id}`, userData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue({
            message: error.response?.data?.message || "Failed to update user",
            status: error.response?.status || 500
        });
    }
});

// Redux Slice
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Fetch user profile
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.user = null;
            })

            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

// Export actions & reducer
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
