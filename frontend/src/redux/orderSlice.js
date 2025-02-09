import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";

export const fetchOrderStats = createAsyncThunk(
  "orders/fetchStats",
  async () => {
    const response = await axios.get(`${BASE_URL}/stats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenue = action.payload.totalRevenue;
        state.totalOrders = action.payload.totalOrders;
        state.averageOrderValue = action.payload.averageOrderValue;
      })
      .addCase(fetchOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
