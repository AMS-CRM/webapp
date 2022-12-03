import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import contactService from "./contactService";

const state = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    contacts: []
}


// Create contaxct
export const createContact = createAsyncThunk("contacts/createContact", async(data, thunkAPI) => {

    try { 

        return await createContact(data);

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

// Get the contacts data 
export const getContacts = createAsyncThunk("contacts/getContacts", async (data, thunkAPI) => {

    try {
           return await contactService.getContacts(data);

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