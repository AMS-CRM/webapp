import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  dashboard: [],
};
export const dashboard = createAsyncThunk(
  "dashboard/dashboard",
  async (_, thunkAPI) => {
    try {
      return await dashboardService.dashboard();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(dashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(dashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.dashboard = action.payload;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
