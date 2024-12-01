import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { adminContext } from '../contextAPI/admins/CreateContextAdmin';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const AProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/' }) => {
  const { isLoggedIn, role } = useContext(adminContext);

  if (!isLoggedIn || role !== 'Admin') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default AProtectedRoute;
