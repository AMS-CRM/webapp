import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const state = {
    isLoading: false,
    isError: false, 
    isSuccess: false,
    message: '',
    user: localStorage.getItem("user") || null
}

const userSlice = createSlice({
    name: 'User',
    initialState: state,
    reducers: {
        reset: (state) => {
            isLoading = false
            isSuccess =false,
            isError = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase()
    }

})