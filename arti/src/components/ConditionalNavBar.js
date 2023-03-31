import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const ConditionalNavBar = () => {
  const location = useLocation();
  
  console.log('Current pathname:', location.pathname); // Log the current pathname

  // Checks if current path is not signup or login
  const shouldRenderNavbar = !['/signup', '/'].includes(location.pathname);

  return shouldRenderNavbar ? <NavBar /> : null;
};

export default ConditionalNavBar;