import PropTypes from 'prop-types';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router-dom';
import useRole from '../hooks/useRole';

const SellerRoute = ({children}) => {
	const [role, isLoading] = useRole();
  
	if (isLoading) return <LoadingSpinner />
	if (role === 'seller') return children
	return <Navigate to='/dashboard' state={{ from: location }} replace='true' />
  }
  
  SellerRoute.propTypes = {
	children: PropTypes.element,
  }

export default SellerRoute;