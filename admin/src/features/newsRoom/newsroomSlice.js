import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsroomService from "./newsroomServices";

const initialState = {
  newsrooms: [],
  newsroom: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Async thunk for fetching all newsroom items
export const getAllNewsroomItems = createAsyncThunk(
  "newsroom/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await newsroomService.getAllNewsroomItems();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching a single newsroom item by ID
export const getNewsroomItemById = createAsyncThunk(
  "newsroom/getById",
  async (id, thunkAPI) => {
    try {
      const response = await newsroomService.getNewsroomItemById(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating a new newsroom item
export const createNewsroomItem = createAsyncThunk(
  "newsroom/create",
  async (newsroomData, thunkAPI) => {
    try {
      const response = await newsroomService.createNewsroomItem(newsroomData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a newsroom item by ID
export const updateNewsroomItem = createAsyncThunk(
  "newsroom/update",
  async ({ id, newsroomData }, thunkAPI) => {
    try {
      const response = await newsroomService.updateNewsroomItem(id, newsroomData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a newsroom item by ID
export const deleteNewsroomItem = createAsyncThunk(
  "newsroom/delete",
  async (id, thunkAPI) => {
    try {
      const response = await newsroomService.deleteNewsroomItem(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const newsroomSlice = createSlice({
  name: "newsroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get all newsrooms
      .addCase(getAllNewsroomItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNewsroomItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newsrooms = action.payload;
        state.isError = false;
      })
      .addCase(getAllNewsroomItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while fetching newsroom items";
      })
      // Get a newsroom by ID
      .addCase(getNewsroomItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewsroomItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newsroom = action.payload;
        state.isError = false;
      })
      .addCase(getNewsroomItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while fetching the newsroom item";
      })
      // Create a newsroom
      .addCase(createNewsroomItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewsroomItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newsrooms.push(action.payload);
        state.isError = false;
        state.message = "Newsroom item created successfully!";
      })
      .addCase(createNewsroomItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while creating the newsroom item";
      })
      // Update a newsroom
      .addCase(updateNewsroomItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNewsroomItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newsrooms = state.newsrooms.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.isError = false;
        state.message = "Newsroom item updated successfully!";
      })
      .addCase(updateNewsroomItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while updating the newsroom item";
      })
      // Delete a newsroom
      .addCase(deleteNewsroomItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNewsroomItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newsrooms = state.newsrooms.filter((item) => item.id !== action.payload.id);
        state.isError = false;
        state.message = "Newsroom item deleted successfully!";
      })
      .addCase(deleteNewsroomItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred while deleting the newsroom item";
      });
  },
});

export const selectAllNewsroomItems = (state) => state.newsroom.newsrooms;
export const selectNewsroomItem = (state) => state.newsroom.newsroom;

export default newsroomSlice.reducer;
