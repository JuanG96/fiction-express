import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
