import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const state = {
    isLoading: false,
    isError: false, 
    isSuccess: false,
    message: '',
    user: localStorage.getItem("user") || null
}

// Register the user 
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {

    try {

        return await authService.register(userData);

    } catch (error) {

        const message =  ( 
                error.response && 
                error.response.data && 
                error.response.data.error || error.response.data.message)  ||
            error.message || 
            error.toString();
            
            return thunkAPI.rejectWithValue(message)

    }

})

const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
            state.isError = false
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }

})

export const { reset } = authSlice.actions
export default authSlice.reducer