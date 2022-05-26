import { Route, Routes } from "react-router-dom";

// context and utils
import { AuthProvider } from "./context/auth-context";
import { LayoutProvider } from "./context/layout-context";
import PublicRoute from "./utils/public-route";
import ProtectedRoute from "./utils/protected-route";

// pages
import Landing from "./pages/Landing";
import UserSignin from "./pages/UserSignin";
import UserSignup from "./pages/UserSignup";
import UserPasswordReset from "./pages/UserPasswordReset";

import AdminSignin from "./pages/admin/Signin";

function App() {
  return (
    <AuthProvider>
      <LayoutProvider>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route
            path="/signin"
            element={
              <PublicRoute>
                <UserSignin />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <UserSignup />
              </PublicRoute>
            }
          />

          <Route
            path="/password-reset"
            element={
              <PublicRoute>
                <UserPasswordReset />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={<ProtectedRoute page="dashboard" />}
          />
          <Route path="/tickets" element={<ProtectedRoute page="tickets" />} />
          <Route
            path="/tickets/:ticketId"
            element={<ProtectedRoute page="ticket" />}
          />
          <Route
            path="/t%C3%ADckets/:ticketId"
            element={<ProtectedRoute page="ticket-alt" />}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute page="notifications" />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute page="profile" />}
          />
          <Route
            path="/profile/update/"
            element={<ProtectedRoute page="update-profile" />}
          />
          <Route
            path="/profile/change-password/"
            element={<ProtectedRoute page="change-password" />}
          />
          <Route
            path="/help-center"
            element={<ProtectedRoute page="help-center" />}
          />

          {/* evaluator */}
          <Route
            path="/tickets/all/"
            element={<ProtectedRoute page="all-tickets" />}
          />
          <Route
            path="/t%C3%ADckets/all/"
            element={<ProtectedRoute page="all-tickets-alt" />}
          />

          {/* student */}
          <Route
            path="/tickets/new/"
            element={<ProtectedRoute page="new-ticket" />}
          />

          {/* admin */}
          <Route
            path="/admin/signin"
            element={
              <PublicRoute>
                <AdminSignin />
              </PublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute page="admin-dashboard" />}
          />

          <Route
            path="/admin/users"
            element={<ProtectedRoute page="admin-user-management" />}
          />
          {/* <Route path="/admin/users" element={<ProtectedRoute page="admin-user-management" />} /> */}
          <Route
            path="/admin/users/evaluator/new"
            element={<ProtectedRoute page="admin-create-evaluator" />}
          />

          <Route
            path="/admin/tickets/all/"
            element={<ProtectedRoute page="admin-all-tickets" />}
          />
          <Route
            path="/admin/tickets"
            element={<ProtectedRoute page="admin-tickets" />}
          />
          <Route
            path="/admin/tickets/:ticketId"
            element={<ProtectedRoute page="admin-ticket" />}
          />
          <Route
            path="/admin/t%C3%ADckets/:ticketId"
            element={<ProtectedRoute page="admin-ticket-alt" />}
          />
          <Route
            path="/admin/notifications"
            element={<ProtectedRoute page="notifications" />}
          />
          <Route
            path="/admin/profile"
            element={<ProtectedRoute page="admin-profile" />}
          />
          <Route
            path="/admin/profile/update/"
            element={<ProtectedRoute page="admin-update-profile" />}
          />
          <Route
            path="/admin/profile/change-password/"
            element={<ProtectedRoute page="admin-change-password" />}
          />
        </Routes>
      </LayoutProvider>
    </AuthProvider>
  );
}

export default App;
