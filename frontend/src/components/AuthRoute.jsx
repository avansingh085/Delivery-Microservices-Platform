import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ isPrivate, user }) => {
  
  if (user === undefined) return null; 

  if (isPrivate) {
   
    return user ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default AuthRoute;
