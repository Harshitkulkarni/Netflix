import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesData";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    moviesData: moviesReducer,
  },
});

export default appStore;
