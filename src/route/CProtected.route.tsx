import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const CProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/user-login' }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const role = localStorage.getItem('role');

  if (isLoggedIn === 'false' || role !== 'Customer') {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default CProtectedRoute;
