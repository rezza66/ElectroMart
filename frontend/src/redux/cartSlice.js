import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/config";

// **1. Fetch Cart**
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch cart");
    }
  }
);

// **2. Add to Cart**
export const addToCart = createAsyncThunk('cart/addToCart', async (item, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart/add`, item, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    return response.data.cartItem; // Mengembalikan cart item yang diperbarui/dibuat
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to add to cart');
  }
});


// **3. Update Cart**
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ cartItemId, qty }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/cart/update/${cartItemId}`,
        { qty },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data; // Mengembalikan item yang diperbarui
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update cart");
    }
  }
);

// **4. Remove from Cart**
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/cart/delete/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return cartItemId; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to remove from cart"
      );
    }
  }
);

// **5. Clear Cart After Payment**
export const clearCartAfterPayment = createAsyncThunk(
  "cart/clearCartAfterPayment",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/delete-after-payment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to clear cart after payment");
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const newItem = action.payload;
      
        // Cari item yang sama berdasarkan ID produk
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.product === newItem.product
        );
      
        if (existingItemIndex !== -1) {
          // Jika produk sudah ada, perbarui quantity
          state.cartItems[existingItemIndex].qty = newItem.qty;
        } else {
          // Jika produk belum ada, tambahkan ke cart
          state.cartItems.push(newItem);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload?.cartItem;
        if (!updatedItem) return;
        const index = state.cartItems.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (index !== -1) {
          state.cartItems[index] = updatedItem;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear Cart After Payment
    .addCase(clearCartAfterPayment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(clearCartAfterPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = [];
    })
    .addCase(clearCartAfterPayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
