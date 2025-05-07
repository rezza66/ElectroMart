// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";

// Thunk untuk mengambil semua produk
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Terjadi kesalahan");
    }
  }
);

// Thunk untuk menambah produk baru
export const addNewProduct = createAsyncThunk(
  "products/addNew",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Append semua field ke FormData
      Object.keys(productData).forEach(key => {
        if (key === 'picture') {
          // Handle multiple files
          productData.picture.forEach(file => {
            formData.append('picture', file);
          });
        } else {
          formData.append(key, productData[key]);
        }
      });

      const response = await axios.post(`${BASE_URL}/product`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Gagal menambah produk");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    addStatus: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
  },
  reducers: {
    resetAddStatus: (state) => {
      state.addStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Product
      .addCase(addNewProduct.pending, (state) => {
        state.addStatus = 'loading';
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.addStatus = 'succeeded';
        state.items = [...state.items, action.payload];
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.addStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetAddStatus } = productSlice.actions;
export default productSlice.reducer;