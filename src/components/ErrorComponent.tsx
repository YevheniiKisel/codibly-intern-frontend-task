// IMPORTS -->
  // React Redux
import {useAppSelector} from '../app/hooks'
  // CSS
import './ErrorComponent.css';


// COMPONENTS --> 
const ErrorComponent = () => {
  // VARIABLES -->
    // retrieve error state from redux store
  const errorState = useAppSelector(state => state.error.errorMessage)
  

  // RENDER -->
  return (
    <div className='error'>
      <h3 className='error__message'>{errorState}</h3>
      <div className='error__emoji'>ヽ（・＿・；)ノ</div>
    </div>
  )
}

export default ErrorComponent;
