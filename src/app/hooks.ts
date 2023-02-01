// IMPORTS --> 
  //React-Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

  // Redux store state and dispatch
import {RootState, AppDispatch} from './store'



// ! Create predefined versions of Redux hooks, that already know the right types of our state and dispatch

//Describe useDispatch which know the exact TypeScript types of our dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();
//Describe useSelector which know the exact TypeScript type of our state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;