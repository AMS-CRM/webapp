import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import contactService from "./contactService";

const state = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    contacts: []
}

// Get the contacts data 
export const getContacts = createAsyncThunk("contacts/getContacts", async (_, thunkAPI) => {

    try {
           return await contactService.getContacts();

    } catch (error) {

        const message = (
                error.response &&
                error.response.data &&
                error.response.data.error || error.response.data.message)  
            error.message || 
            error.toString();
            
            return thunkAPI.rejectWithValue(message)
    }

})


const contactSlice = createSlice({
    name: "contacts",
    initialState: state,
    reducers: {
        reset: (state) => {
            return {...state}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(getContacts.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.contacts = action.payload
        })
        .addCase(getContacts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = contactSlice.actions
export default contactSlice.reducer