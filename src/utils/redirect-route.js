import { useContext } from "react";

import AuthContext from "../context/auth-context";
import Dashboard from "../pages/student/Dashboard";
import EvaluatorDashboard from "../pages/evaluator/Dashboard";

import Profile from "../pages/student/Profile";
import EvaluatorProfile from "../pages/evaluator/Profile";

import Tickets from "../pages/student/Tickets";
import EvaluatorTickets from "../pages/evaluator/Tickets";

import Ticket from "../pages/student/Ticket";
import EvaluatorTicket from "../pages/evaluator/Ticket";

import TicketAlt from "../pages/student/Ticket-alt";
import EvaluatorTicketAlt from "../pages/evaluator/Ticket-alt";

import UpdateProfile from "../pages/student/UpdateProfile";
import ChangePassword from "../pages/student/ChangePassword";

// const RedirectRoute = ({page}) => {
//   const { role } = useContext(AuthContext);
//   console.log(page)
//   return role === 'student' ? <Dashboard /> : null
// };

// export default RedirectRoute;

export default function RedirectRoute({ page }) {
  const { role } = useContext(AuthContext);

  switch (page) {
    case "dashboard":
      return role === "student" ? <Dashboard /> : <EvaluatorDashboard />;
    case "profile":
      return role === "student" ? <Profile /> : <EvaluatorProfile />;
    case "tickets":
      return role === "student" ? <Tickets /> : <EvaluatorTickets />;
    case "ticket":
      return role === "student" ? <Ticket /> : <EvaluatorTicket />;
    case "ticket-alt":
      return role === "student" ? <TicketAlt /> : <EvaluatorTicketAlt />;
    case "updateprofile":
      return role === "student" ? <UpdateProfile /> : null;
    case "changepassword":
      return role === "student" ? <ChangePassword /> : null;
    default:
      return null;
  }

  //   if (page === "dashboard") {
  //     return role === "student" ? <Dashboard /> : null;
  //   }
  //   if (page === "dashboard") {
  //     return role === "student" ? <Dashboard /> : null;
  //   }
}
