// IMPORTS --> 
  //React, Redux, React Router
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
    // My explicit hooks 
import {useAppDispatch} from '../app/hooks';
    // My actions
import { setErrorMessage } from '../features/error/errorSlice';
import { toggleModal, writeModalData } from '../features/modal/modalSlice';

  // TypeScript interfase
import { Product } from '../types';

  // Utilities
import castErrorMessage from '../utilities/castErrorMessage';

  //Visual content, CSS
import './ListedProducts.css'; //Table style




const FilteredProducts = () => {
  // VARIABLES -->
    // for redirection to the FilteredProducts component on submit
  const navigate = useNavigate();
    // for access to the current page in URL
  const { productID } = useParams();  
    // retrieve dispatch in order to interact with global state
  const dispatch = useAppDispatch();


  // STATES --> 
    // Fetched product object store
  const [product, setProduct] = useState<Product>();

  
  //ON MOUNT --> 
  useEffect(() => {
    //Fetch data on mount
    productID ? fetchProduct(productID) : undefined
  }, [productID]);

  
  // HELPERS FUNCTIONS -->
    // fetch data based on the filtered product ID in url
    const fetchProduct = async (productID: string) => {
      try {
        const response = await fetch(`https://reqres.in/api/product/${productID}`);
        if (!response.ok) {
          throw new Error(castErrorMessage(response.status));
        } 
        const data = await response.json();
        setProduct(data.data); 
      } catch (e: unknown) {
        if (e instanceof Error) {
          dispatch(setErrorMessage(e.message));
        }
      }
    };
  

  // HANDLERS -->
    // Handle redirection to the "List page"
  const handleBackToList = () => {
    navigate("/list/1")
  };
    // Change modal global state in order to toggle visibility and pass data for displaying
  const handleModalDisplay = (productData: Product) => {
      dispatch(toggleModal());
      dispatch(writeModalData(productData));
    };
      

  // RENDER -->
  return (
    <main className='filter'>
      <h2 className='filter__title'>Filtered product</h2>
      <table className='product-table'>
          <thead className='product-table__titles'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody className='product-table__data'>
           {
            product ?
                  <tr style={{backgroundColor: product.color}} key={product.id} onClick = {() => handleModalDisplay(product)}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.year}</td>
                  </tr>
                  
           :undefined}                
          </tbody>          
        </table>
        <button className='return-button' onClick={handleBackToList}>
        <i className="fa-solid fa-arrow-left"/> Back to Product List
        </button>
      </main>
  )
}

export default FilteredProducts
