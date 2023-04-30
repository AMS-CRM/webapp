import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  contacts: [],
  contact: [],
};

// Create Contact
export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (data, thunkAPI) => {
    try {
      return await contactService.createContact(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.response.data.message;
      error.message || error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a contact
export const getContactWithEmail = createAsyncThunk(
  "contacts/getContactWithEmail",
  async (email, thunkAPI) => {
    try {
      return await contactService.getContactWithEmail(email);
    } catch (error) {
      const message =
        error.response ||
        error.response.data ||
        error.response.data.message ||
        error.message ||
        error.toString;
      thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (data, thunkAPI) => {
    try {
      return await contactService.deleteContact(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.response.data.message;
      error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit contact
export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (data, thunkAPI) => {
    try {
      return await contactService.editContact(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.response.data.message;
      error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get the contacts data
export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (data, thunkAPI) => {
    try {
      return await contactService.getContacts(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.response.data.message;
      error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      return { ...initialState, contacts: { ...state.contacts } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contacts = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.data.msg;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getContactWithEmail.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getContactWithEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.contact = action.payload;
      })
      .addCase(getContactWithEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;
export default contactSlice.reducer;
