// IMPORTS -->
  // Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  // TS types
import { ErrorState } from "../../types";



// INITIAL STATE -->
const initialState: ErrorState = {
  errorMessage: null,
}


// SLICER -->
const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    // Set an error message
    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },

    // Reset an error message 
    resetErrorMessage(state) {
      state.errorMessage = null;
    }
  }
});

export const {setErrorMessage, resetErrorMessage} = errorSlice.actions;
export default errorSlice.reducer;