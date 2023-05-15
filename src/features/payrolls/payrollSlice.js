import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import payrollService from "./payrollService";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  list: [],
  payroll: {},
  paystubURL: "",
  employeePayroll: {},
  payrollRun: {
    totalAmount: 0,
    users: [],
  },
};

// Get the download link for paystub
export const getPayStubDownloadLink = createAsyncThunk(
  "payroll/getPayStubDownloadLink",
  async (data, thunkAPI) => {
    try {
      return payrollService.paystubDownloadLink(data);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get the data of an individual payrolld
export const getPayroll = createAsyncThunk(
  "payroll/getPayroll",
  async (payroll, thunkAPI) => {
    try {
      return await payrollService.getPayroll(payroll);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.error)) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Approve
export const approvePayroll = createAsyncThunk(
  "payroll/approvePayroll",
  async (payroll, thunkAPI) => {
    try {
      return await payrollService.approvePayroll(payroll);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.error)) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// List the individual payroll history
export const payrollList = createAsyncThunk(
  "payroll/payrollList",
  async (_, thunkAPI) => {
    try {
      return await payrollService.listPayroll();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a new payroll
export const payrollCreate = createAsyncThunk(
  "payroll/payrollCreate",
  async (data, thunkAPI) => {
    try {
      return await payrollService.createPayroll(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.error || error.response.data.message)) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Employee payroll - Get the single payroll for an employee
export const getEmployeePayroll = createAsyncThunk(
  "payroll/getEmployeePayroll",
  async (data, thunkAPI) => {
    try {
      return await payrollService.getEmployeePayroll(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.error || error.response.data.message)) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    reset: (state) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(payrollCreate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(payrollCreate.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.payrollRun = [];
        state.message = action.payload;
      })
      .addCase(payrollCreate.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.payrollRun = action.payload;
      })
      .addCase(payrollList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(payrollList.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(payrollList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getPayroll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayroll.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.payroll = action.payload;
      })
      .addCase(getPayroll.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(approvePayroll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approvePayroll.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(approvePayroll.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getPayStubDownloadLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayStubDownloadLink.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.paystubURL = action.payload;
      })
      .addCase(getPayStubDownloadLink.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getEmployeePayroll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeePayroll.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.employeePayroll = action.payload;
      })
      .addCase(getEmployeePayroll.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = payrollSlice.actions;
export default payrollSlice.reducer;
