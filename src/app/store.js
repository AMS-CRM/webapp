import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import authReducer from "../features/auth/authSlice"

const reducer = {
    auth: authReducer 
}

export const store = configureStore({reducer})