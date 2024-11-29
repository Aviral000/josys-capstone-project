import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { customerContext } from '../contextAPI/customers/createContext';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const CProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/user-login' }) => {
  const { isLoggedIn, role } = useContext(customerContext);

  if (!isLoggedIn || role !== 'Customer') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default CProtectedRoute;
