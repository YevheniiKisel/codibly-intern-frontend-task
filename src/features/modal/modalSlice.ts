// IMPORTS -->
  // Redux
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  // TS types
import { ModalState, Product } from "../../types";


// INITIAL STATE -->
const initialState: ModalState = {
  modalIsOpen: false,
  modalData: undefined
}


// SLICER -->
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Toggle modal
    toggleModal(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
    // Store product data in order to display it in modal
    writeModalData(state, action: PayloadAction<Product>) {
      state.modalData = {...action.payload};
    }
  }
});

export const {toggleModal, writeModalData} = modalSlice.actions;
export default modalSlice.reducer;