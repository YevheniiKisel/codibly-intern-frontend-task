// IMPORTS -->
  // React, Redux
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

  // Redux Slicers
import errorReducer from "../features/error/errorSlice";
import modalReducer from "../features/modal/modalSlice";

//Configure a Redux store
export const store = configureStore({
  reducer: {
    error: errorReducer,
    modal: modalReducer
  },
})

//To get a Dispatch Type
export type AppDispatch = typeof store.dispatch;

//To get State Type
export type RootState = ReturnType<typeof store.getState>;

