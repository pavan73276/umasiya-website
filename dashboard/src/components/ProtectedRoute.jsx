import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  // Check for role-specific authentication
  if (role === "staff" && isAuthenticated != 'staff') {
    return <Navigate to="/login" />;
  }
  if (role === "Admin" && isAuthenticated != 'Admin') {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
