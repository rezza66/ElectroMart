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

export const createOrderWithPayment = createAsyncThunk(
  "orders/createOrderWithPayment",
  async ({ products, totalAmount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/order`,
        {
          products,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Gagal membuat pesanan");
    }
  }
);

// Tambahkan ini untuk fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {

    try {
      const response = await axios.get(
        `${BASE_URL}/orders/my-orders?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Gagal mengambil pesanan");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    // Statistik
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    
    // Data pesanan user
    userOrders: [],
    currentPage: 1,
    totalPages: 1,
    userOrdersCount: 0,
    
    // Pesanan terakhir
    lastOrder: null,
    
    // Status
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchOrderStats
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
      })
      
      // Handle createOrderWithPayment
      .addCase(createOrderWithPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderWithPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
      })
      .addCase(createOrderWithPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handle fetchUserOrders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload.orders;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.userOrdersCount = action.payload.totalOrders;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;