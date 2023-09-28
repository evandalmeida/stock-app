import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from './AuthContextProvider';


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default ProtectedRoute;