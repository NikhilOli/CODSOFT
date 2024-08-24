import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const {isLoading } = useAuth0();
  const { isAuthenticated } = useAuth();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;