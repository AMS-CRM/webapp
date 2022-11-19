import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import authReducer from "../features/auth/authSlice"
import contactReducer from "../features/contacts/contactSlice"

const reducer = {
    auth: authReducer,
    contacts: contactReducer
}

export const store = configureStore({reducer})