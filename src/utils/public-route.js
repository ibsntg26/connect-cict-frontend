import { Navigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/auth-context";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
