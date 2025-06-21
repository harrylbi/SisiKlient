import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { isLoggedIn, isLoading, user } = useAuth();

  // Loading state
  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  // Belum login, redirect ke /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Jika `role` diberikan, cek apakah user memiliki role tersebut
  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!allowedRoles.includes(user?.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Jika lulus semua validasi, render children atau outlet
  return children || <Outlet />;
};

export default ProtectedRoute;
