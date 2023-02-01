// IMPORTS -->
  // React
import React from 'react'
  // TS types
import { Product } from '../types';
  // CSS
import './ModalBox.css';


// COMPONENTS -->
const ModalBox = (props: { modalData:Product } ) => {
  

  // RENDER -->
  return (
    <div className="modal" style={{boxShadow: `6px 6px 32px ${props.modalData.color}` }}>
      <h4 className='modal__title'>Product details:</h4>
      <ul className='modal__list'>
        <li className='modal__detals'>
          ID: {props.modalData.id}
        </li>
        <li className='modal__detals'>
          Name: {props.modalData.name}
        </li>
        <li className='modal__detals'>
          Year: {props.modalData.year}
        </li>
        <li className='modal__detals'>
          Color: {props.modalData.color}
        </li>
        <li className='modal__detals'>
          Pantone_value: {props.modalData.pantone_value}
        </li>
      </ul>
    </div>  
  )
}

export default ModalBox
