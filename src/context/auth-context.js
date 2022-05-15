import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [canReport, setCanReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  if (user && !role) {
    switch (user.role) {
      case 1:
        setRole("admin");
        break;
      case 2:
        setRole("evaluator");
        break;
      case 3:
        setRole("student");
        break;
      default:
        setRole(null);
    }
  }

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const data = await response.json();

    if (!response) alert("No server response");
    else {
      if (response.status === 200) {
        // if success
        setAuthTokens(data);
        setUser(jwt_decode(data.access));

        localStorage.setItem("authTokens", JSON.stringify(data));
        setError(null);
        navigate("/dashboard");
      } else if (response.status === 400) {
        setError("Please enter an email or password");
      } else if (response.status === 401) {
        setError("Invalid email or password");
      } else setError("Login failed");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    setRole(null);
    setCanReport(false);
    setError(null);
    localStorage.removeItem("authTokens");
    navigate("/signin");
  };

  const contextData = {
    user: user,
    role: role,
    authTokens: authTokens,
    canReport: canReport,
    error: error,
    setUser: setUser,
    setAuthTokens: setAuthTokens,
    setCanReport: setCanReport,
    setError: setError,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setIsLoading(false);
  }, [authTokens, isLoading]);

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};
