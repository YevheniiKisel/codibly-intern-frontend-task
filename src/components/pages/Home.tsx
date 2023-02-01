// IMPORTS -->
  // React, Redux, React Router
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
    //My explicit hooks
import { useAppDispatch, useAppSelector } from '../../app/hooks';
    //Actions
import { resetErrorMessage } from '../../features/error/errorSlice';

  // Visual content, CSS
import './Home.css'


// COMPONENTS -->
const Home = () => {
  // STATES --> 
    // To disable button if input is empty
  const [isEmpty, setIsEmpty] = useState(true);
    // To control input value
  const [filter, setFilter] = useState("");


  // VARIABLES --> 
    // For redirection onSubmit event
  const navigate = useNavigate();
    // For path tracking in order to reset error global state on change
  const location = useLocation();
    // retrieve dispatch in order to reset error global state on url change
  const dispatch = useAppDispatch();
    // retrieve error global state to handle input style
  const isError = useAppSelector(state => state.error.errorMessage);
  console.log(isError);
  
  // ON MOUNT --> 
  useEffect(() => {
    // reset error global state in case if it was invoked
    dispatch(resetErrorMessage())
  }, [location.pathname]);


  // HANDLERS --> 
    //Get an ID from input on submit and redirect to that url
  const handleFilter = (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).elements.namedItem('productID') as HTMLInputElement;
    const productID = input.value;
    navigate(`/filter/${productID}`);
  };
    //Text input print just numerical chars
  const handleFilterChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputID = event.currentTarget.value.replace(/[^0-9]/g, '');
    setFilter(inputID);
      //If input is not empty, unable button 'Filter'
    inputID ? setIsEmpty(false) : setIsEmpty(true);
  }
  
  // RENDER --> 
  return (
    <header className='header'>
      <h1 className='header__title'>Codibi test task</h1>
      <form className="form" action="" onSubmit={handleFilter} >
        <label className='form__label' htmlFor="filter">Filter by ID: </label>
        <input className={ isError? 'form__input form__input--error' : 'form__input'} type="text" id="filter" name='productID' onChange={handleFilterChange} value={filter}/>
        <button className='form__button' disabled={isEmpty}
        type='submit'><i className="fa-solid fa-filter"/> Filter</button>
      </form>
    </header>
  )
}

export default Home
