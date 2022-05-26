import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/auth-context";

// pages
import StudentDashboard from "../pages/student/Dashboard";
import StudentTickets from "../pages/student/Tickets";
import StudentTicket from "../pages/student/Ticket";
import StudentTicketAlt from "../pages/student/TicketAlt";
import StudentNewTicket from "../pages/student/NewTicket";
import StudentProfile from "../pages/student/Profile";
import StudentProfileUpdate from "../pages/student/ProfileUpdate";
import StudentPasswordChange from "../pages/student/ProfilePasswordChange";

import EvaluatorDashboard from "../pages/evaluator/Dashboard";
import EvaluatorAllTickets from "../pages/evaluator/AllTickets";
import EvaluatorAllTicketsAlt from "../pages/evaluator/AllTicketsAlt";
import EvaluatorTickets from "../pages/evaluator/Tickets";
import EvaluatorTicket from "../pages/evaluator/Ticket";
import EvaluatorTicketAlt from "../pages/evaluator/TicketAlt";
import EvaluatorProfile from "../pages/evaluator/Profile";
import EvaluatorProfileUpdate from "../pages/evaluator/ProfileUpdate";
import EvaluatorPasswordChange from "../pages/evaluator/ProfilePasswordChange";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUserManagement from "../pages/admin/UserManagement";
import AdminAddEvaluator from "../pages/admin/AddEvaluator";
import AdminAllTickets from "../pages/admin/AllTickets";
import AdminTickets from "../pages/admin/Tickets";
import AdminTicket from "../pages/admin/Ticket";
import AdminTicketAlt from "../pages/admin/TicketAlt";
import AdminProfile from "../pages/admin/Profile";
import AdminProfileUpdate from "../pages/admin/ProfileUpdate";
import AdminPasswordChange from "../pages/admin/ProfilePasswordChange";

import UserNotifications from "../pages/UserNotifications";
import HelpCenter from "../pages/HelpCenter";
import Forbidden from "../pages/Forbidden";

export default function ProtectedRoute({ page }) {
  const { user, role } = useContext(AuthContext);

  if (user) {
    switch (page) {
      case "dashboard":
        if (role === "evaluator") return <EvaluatorDashboard />;
        else if (role === "admin") return <Navigate to="/admin/dashboard" />;
        else return <StudentDashboard />;

      case "all-tickets":
        return role === "evaluator" ? <EvaluatorAllTickets /> : <Forbidden />;
      case "all-tickets-alt":
        return role === "evaluator" ? (
          <EvaluatorAllTicketsAlt />
        ) : (
          <Forbidden />
        );

      case "tickets":
        return role === "student" ? <StudentTickets /> : <EvaluatorTickets />;
      case "ticket":
        return role === "student" ? <StudentTicket /> : <EvaluatorTicket />;
      case "ticket-alt":
        return role === "student" ? (
          <StudentTicketAlt />
        ) : (
          <EvaluatorTicketAlt />
        );

      case "new-ticket":
        return role === "student" ? <StudentNewTicket /> : null;
      case "notifications":
        return <UserNotifications />;
      case "profile":
        return role === "student" ? <StudentProfile /> : <EvaluatorProfile />;
      case "update-profile":
        return role === "student" ? <StudentProfileUpdate /> : <EvaluatorProfileUpdate />;
      case "change-password":
        return role === "student" ? <StudentPasswordChange /> : <EvaluatorPasswordChange />;
      case "help-center":
        return <HelpCenter />;

      // admin
      case "admin-dashboard":
        return role === "admin" ? <AdminDashboard /> : <Forbidden />;
      case "admin-user-management":
        return role === "admin" ? <AdminUserManagement /> : <Forbidden />;
      case "admin-create-evaluator":
        return role === "admin" ? <AdminAddEvaluator /> : <Forbidden />;
      case "admin-all-tickets":
        return role === "admin" ? <AdminAllTickets /> : <Forbidden />;
      case "admin-tickets":
        return role === "admin" ? <AdminTickets /> : <Forbidden />;
      case "admin-ticket":
        return role === "admin" ? <AdminTicket /> : <Forbidden />;
      case "admin-ticket-alt":
        return role === "admin" ? <AdminTicketAlt /> : <Forbidden />;
      case "admin-profile":
        return role === "admin" ? <AdminProfile /> : <Forbidden />;
      case "admin-update-profile":
        return role === "admin" ? <AdminProfileUpdate /> : <Forbidden />;
      case "admin-change-password":
        return role === "admin" ? <AdminPasswordChange /> : <Forbidden />;

      default:
        return null;
    }
  } else {
    return <Navigate to="/signin" />;
  }
}
