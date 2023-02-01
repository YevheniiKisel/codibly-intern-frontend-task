// IMPORTS --> 
  // React, Redux, React Router
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
    //My explicit hooks
import { useAppDispatch } from '../app/hooks';
    // My actions
import { setErrorMessage } from '../features/error/errorSlice';
import { toggleModal, writeModalData } from '../features/modal/modalSlice';

  // TypeScript interface
import { Product } from '../types';

  // Utilities
import castErrorMessage from '../utilities/castErrorMessage';
  
  // Visual content, CSS
import { Pagination } from '@mui/material';
import './ListedProducts.css';


// GLOBAL VARIABLES -->
  // How many products to show per page
const ITEMS_PER_PAGE = 5;


// COMPONENTS -->
const ListedProducts = () => {
  // VARIABLES -->
    // for access to the current page in URL
  const { page } = useParams();
    // for redirection to the FilteredProducts component on submit
  const navigate = useNavigate();
    // retrieve dispatch in order to interact with global state
  const dispatch = useAppDispatch();


  // STATES -->
    // Fetched products array store
  const [products, setProducts] = useState<Product[]>();
    // To handle pagination
  const [totalPages, setTotalPages] = useState(0);


  // ON MOUNT -->
  useEffect(() => {
    // Fetch data on mount
    page ? fetchList(page) : undefined;
  }, [page]);


  // HELPERS FUNCTIONS -->
    // fetch data based on the current page in url
  const fetchList = async (currentPage: string) => {
    try {
      const response = await fetch(`https://reqres.in/api/product?page=${currentPage}&per_page=${ITEMS_PER_PAGE}`);
      if (!response.ok) {
        throw new Error(castErrorMessage(response.status));
      } 
      const data = await response.json();          
      setProducts(data.data);
      setTotalPages(data.total_pages);
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(setErrorMessage(e.message));
      }
    }
  };
    
  
  // HANDLERS FUNCTION -->
    //Handle pagination
  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    navigate(`/list/${page}`);
  };
    // Change modal global state in order to toggle visibility and pass data for displaying
  const handleModalDisplay = (productData: Product) => {
    dispatch(toggleModal());
    dispatch(writeModalData(productData));
  };


  // RENDER -->
  return (
    <main className='list'>
      <h2 className="list__title">Listed porducts</h2>
      <table className='product-table'>
          <thead className='product-table__titles'>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody className='product-table__data'>
            { products && products.map((product) => {
                return (
                  <tr style={{backgroundColor: product.color}} key={product.id} onClick = {() => handleModalDisplay(product)}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.year}</td>
                  </tr>
                )
              }) 
            }
          </tbody>          
        </table>
        <Pagination count={totalPages} defaultPage={Number(page)}  color='secondary' onChange={handlePagination} sx={{
            display: 'flex',
            justifyContent: 'center',
          }} />
    </main>
  )
}

export default ListedProducts
