import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  transactions: [],
};

// Get the list of transactions
export const transactionList = createAsyncThunk(
  "transaction/transactionList",
  async (page, thunkAPI) => {
    try {
      return await transactionService.transactionsList(page);
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

// Create a slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    reset: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transactionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transactionList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(transactionList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
