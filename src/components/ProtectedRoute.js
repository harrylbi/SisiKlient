// PROTECTED ROUTE (Route yang Dilindungi) (ProtectedRoute.js) ===> src/components/ProtectedRoute.js

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // ✅ Di sinilah <Navigate /> digunakan:
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
