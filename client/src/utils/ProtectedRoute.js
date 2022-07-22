import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector(state => state.auth)



    // return user && (user!== undefined) ? children : <Navigate to="/" />
    return isAuthenticated ? children : <Navigate to="/" />
}

export default ProtectedRoute;
