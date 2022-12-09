import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import countriesService from "./countriesService"; 

export const getCountries = createAsyncThunk("countries/getCountries", async (_, thunkAPI) => {

    try {
        return await countriesService.getCountries();
    } catch(error) {
          const message = (
            error.response &&
            error.response.data &&
            error.response.data.error || error.response.data.message)  
            error.message || 
            error.toString();
            return thunkAPI.rejectWithValue(message)
    }

})


const countriesSlice = createSlice({
    name: "countries",
    initialState: {
        isSuccess: false,
        isError: false,
        isLoading: false,
        data: [],
        message: ""
    },
    reducers: {
        reset: (state) => {
            return {...state}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCountries.pending, (state) => {
            state.isLoading = true
            state.error = false
        })
        .addCase(getCountries.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.data = action.payload
        })
        .addCase(getCountries.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        })
    }
});

export const { reset } = countriesSlice.actions
export default countriesService.reducers
