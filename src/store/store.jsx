import { configureStore } from "@reduxjs/toolkit";
import { employeeManagerSlice } from "./employeeManagerSlice";

const store = configureStore({
  reducer: { employee_manager: employeeManagerSlice.reducer },
});

export default store;
