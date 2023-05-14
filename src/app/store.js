import { configureStore } from "@reduxjs/toolkit";

// Get the reducers
import authReducer from "../features/auth/authSlice";
import contactReducer from "../features/contacts/contactSlice";
import countriesReducer from "../features/countries/countriesSlice";
import payrollReducer from "../features/payrolls/payrollSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import transactionReducer from "../features/transactions/transactionSlice";

const reducer = {
  auth: authReducer,
  contacts: contactReducer,
  countries: countriesReducer,
  payroll: payrollReducer,
  dashboard: dashboardReducer,
  transaction: transactionReducer,
};

export const store = configureStore({ reducer });
