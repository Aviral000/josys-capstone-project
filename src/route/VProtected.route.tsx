import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VendorContext } from '../contextAPI/vendors/CreateContext';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const VProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/vendor-login' }) => {
  const { isLoggedIn, role } = useContext(VendorContext);

  if (!isLoggedIn || role !== 'Vendor') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default VProtectedRoute;
