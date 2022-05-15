import { useContext } from "react";

import AuthContext from "../context/auth-context";
import Dashboard from "../pages/student/Dashboard";
import Notifications from "../pages/student/Notifications";
import Profile from "../pages/student/Profile";
import Tickets from "../pages/student/Tickets";
import Ticket from "../pages/student/Ticket";

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
      return role === "student" ? <Dashboard /> : null;
    case "notifications":
      return role === "student" ? <Notifications /> : null;
    case "profile":
      return role === "student" ? <Profile /> : null;
    case "tickets":
      return role === "student" ? <Tickets /> : null;
    case "ticket":
      return role === "student" ? <Ticket /> : null;
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
