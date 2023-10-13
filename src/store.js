import { configureStore } from "@reduxjs/toolkit";
import filesReducer from "./filesSlice";

const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});

export default store;