import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/client";
import axios from "axios";

const initialState = {
  products: {
    loading: false,
    data: [],
  },
  product: {
    loading: false,
    data: {},
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.PRODUCTS.getAll(data);
      return response.products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.loading = false;
        state.products.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.products.loading = false;
      });
  },
});

export const { setProduct } = productsSlice.actions;
export default productsSlice.reducer;
