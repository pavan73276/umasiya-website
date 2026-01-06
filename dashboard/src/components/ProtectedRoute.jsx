import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useSelector(
    (state) => state.user
  );

  /* ⏳ Prevent redirect before auth check completes */
  if (loading) {
    return null; // or a loader if you want
  }

  /* 🔒 Not logged in */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /* 🧑‍⚖️ Role-based access */
  if (role && user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
