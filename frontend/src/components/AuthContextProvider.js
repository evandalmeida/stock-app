import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get("/api/check-session", {
      cancelToken: source.token,
      // Ignore response headers that are causing issues
      maxRedirects: 0,
      validateStatus: function (status) {
        return status >= 200 && status < 300;
      },
    })
      .then((response) => {
        setIsAuthenticated(response.data.isAuthenticated);
      })
      .catch((error) => {
        // Enhanced error logging
        if (!axios.isCancel(error)) {
          console.error("Session check failed", error.response ? error.response.data : error.message);
        }
      });

    return () => {
      // Cancel the request if the component unmounts
      source.cancel();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
