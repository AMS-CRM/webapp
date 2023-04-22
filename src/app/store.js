import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import authReducer from "../features/auth/authSlice";
import contactReducer from "../features/contacts/contactSlice";
import countriesReducer from "../features/countries/countriesSlice";
import payrollReducer from "../features/payrolls/payrollSlice";

const reducer = {
  auth: authReducer,
  contacts: contactReducer,
  countries: countriesReducer,
  payroll: payrollReducer,
};

export const store = configureStore({ reducer });
