import { Navigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/auth-context";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
