import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./utils/protected-route";
import { AuthProvider } from "./context/auth-context";
import { LayoutProvider } from "./context/layout-context";

import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import Demo from "./pages/Demo";

import Dashboard from "./pages/student/Dashboard";
import NewTicket from "./pages/student/NewTicket";
import Tickets from "./pages/student/Tickets";
import Notifications from "./pages/student/Notifications";
import Profile from "./pages/student/Profile";

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/demo" element={<Demo />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <NewTicket />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <Tickets />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
