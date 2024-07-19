import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import featuredProductService from "./featuredProductService"; // Adjust the path as needed

const initialState = {
  featuredProducts: [],
  featuredProduct: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Async thunk for fetching all featured products
export const getAllFeaturedProducts = createAsyncThunk(
  "featuredProduct/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await featuredProductService.getAllFeaturedProducts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a single featured product by ID
export const getFeaturedProductById = createAsyncThunk(
  "featuredProduct/getById",
  async (id, thunkAPI) => {
    try {
      const response = await featuredProductService.getFeaturedProductById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new featured product
export const createFeaturedProduct = createAsyncThunk(
  "featuredProduct/create",
  async (featuredProductData, thunkAPI) => {
    try {
      const response = await featuredProductService.createFeaturedProduct(featuredProductData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a featured product by ID
export const updateFeaturedProduct = createAsyncThunk(
  "featuredProduct/update",
  async ({ id, featuredProductData }, thunkAPI) => {
    try {
      const response = await featuredProductService.updateFeaturedProduct(id, featuredProductData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a featured product by ID
export const deleteFeaturedProduct = createAsyncThunk(
  "featuredProduct/delete",
  async (id, thunkAPI) => {
    try {
      const response = await featuredProductService.deleteFeaturedProduct(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const featuredProductSlice = createSlice({
  name: "featuredProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all featured products
      .addCase(getAllFeaturedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredProducts = action.payload;
        state.isError = false;
      })
      .addCase(getAllFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while fetching featured products";
      })
      // Get a featured product by ID
      .addCase(getFeaturedProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredProduct = action.payload;
        state.isError = false;
      })
      .addCase(getFeaturedProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while fetching the featured product";
      })
      // Create a featured product
      .addCase(createFeaturedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFeaturedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredProducts.push(action.payload);
        state.isError = false;
        state.message = "Featured product created successfully!";
      })
      .addCase(createFeaturedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while creating the featured product";
      })
      // Update a featured product
      .addCase(updateFeaturedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFeaturedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredProducts = state.featuredProducts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.isError = false;
        state.message = "Featured product updated successfully!";
      })
      .addCase(updateFeaturedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while updating the featured product";
      })
      // Delete a featured product
      .addCase(deleteFeaturedProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeaturedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredProducts = state.featuredProducts.filter((item) => item.id !== action.payload.id);
        state.isError = false;
        state.message = "Featured product deleted successfully!";
      })
      .addCase(deleteFeaturedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while deleting the featured product";
      });
  },
});

export const selectAllFeaturedProducts = (state) => state.featuredProduct.featuredProducts;
export const selectFeaturedProduct = (state) => state.featuredProduct.featuredProduct;

export default featuredProductSlice.reducer;
