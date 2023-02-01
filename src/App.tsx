// IMPORTS -->
  // React, Redux, React Router
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./app/hooks"

  // Visual content, CSS
import './App.css'
import FilteredProducts from "./components/FilteredProducts";
import ListedProducts from "./components/ListedProducts";
import Home from "./components/pages/Home";
import ErrorComponent from "./components/ErrorComponent";
import { Modal } from "@mui/material";
import { toggleModal } from "./features/modal/modalSlice";
import ModalBox from "./components/ModalBox";


const App = () => {
  // VARIABLES -->
    // retrieve error state from redux store (conditional render)
  const errorState = useAppSelector(state => state.error.errorMessage); 
    // retrieve modal state from redux store (conditional render)
  const modalIsOpen = useAppSelector(state => state.modal.modalIsOpen);
  const modalData = useAppSelector(state => state.modal.modalData);
    // retrieve dispatch in order to interact with global states
  const dispatch = useAppDispatch();

  
  // HELPERS --> 
    // Handle switching modal display
  const handleModalDisplay = () => {
    dispatch(toggleModal());
  }
  

  
  // RENDER -->
  return (
    <Router>
      <Home />
      {errorState ? <ErrorComponent/> :
      <Routes>
        <Route index element={<Navigate to="list/1"/>} />
        <Route path="list/:page" element={<ListedProducts/>} />
        <Route path="filter/:productID" element={<FilteredProducts/>} />
      </Routes>
      }
      {modalData && 
      <Modal open={modalIsOpen} onClose={handleModalDisplay} >
        <ModalBox modalData={modalData} />
      </Modal>}
      
    </Router>
  )
}

export default App

