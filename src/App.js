import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./utils/protected-route";
import RedirectRoute from "./utils/redirect-route";
import { AuthProvider } from "./context/auth-context";
import { LayoutProvider } from "./context/layout-context";

import Landing from "./pages/Landing";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Notifications from "./pages/Notifications";

import Demo from "./pages/Demo";
import AdminDashboard from "./pages/admin/Dashboard";

import NewTicket from "./pages/student/NewTicket";
import HelpCenter from "./pages/student/HelpCenter";

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/demo" element={<Demo />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Role-based routes start */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RedirectRoute page="dashboard" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <RedirectRoute page="profile" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateprofile"
            element={
              <ProtectedRoute>
                <RedirectRoute page="updateprofile" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/changepassword"
            element={
              <ProtectedRoute>
                <RedirectRoute page="changepassword" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets"
            element={
              <ProtectedRoute>
                <RedirectRoute page="tickets" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tickets/:ticketId"
            element={
              <ProtectedRoute>
                <RedirectRoute page="ticket" />
              </ProtectedRoute>
            }
          />

          {/* magic */}
          <Route
            path="/t%C3%ADckets/:ticketId"
            element={
              <ProtectedRoute>
                <RedirectRoute page="ticket-alt" />
              </ProtectedRoute>
            }
          />
          {/* Role-based routes end */}

          <Route
            path="/tickets/new"
            element={
              <ProtectedRoute>
                <NewTicket />
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
            path="/help-center"
            element={
              <ProtectedRoute>
                <HelpCenter />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
