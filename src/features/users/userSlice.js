import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userServices";

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  users: [],
  userSelect : []
};

export const addUser = createAsyncThunk(
  "users/add",
  async (userData, thunkApi) => {
    try {
      const response = await userService.addUser(userData);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/get",
  async (_, thunkApi) => {
    try {
      const response = await userService.getUsers();
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (userData, thunkApi) => {
    try {
      const response = await userService.updateUser(userData);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, thunkApi) => {
    try {
      const response = await userService.getUser(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId, thunkApi) => {
    try {
      const response = await userService.deleteUser(userId);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User added successfully";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userSelect = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User updated successfully";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User deleted successfully";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default userSlice.reducer;
