import React, { useContext } from "react";
import { IoHomeSharp, IoTicketSharp, IoNotificationsSharp, IoPersonSharp, } from "react-icons/io5";
import Sidebar from "../Sidebar";
import NavItem from "../NavItem";

import LayoutContext from "../../context/layout-context";

export default function StudentSidebar() {
  const { navSize } = useContext(LayoutContext);

  return (
    <Sidebar>
      <NavItem
        navSize={navSize}
        icon={IoHomeSharp}
        title="Dashboard"
        link="/dashboard"
      />

      <NavItem
        navSize={navSize}
        icon={IoTicketSharp}
        title="My Tickets"
        link="/tickets"
        //   active
      />

      <NavItem
        navSize={navSize}
        icon={IoNotificationsSharp}
        title="Notifications"
        link="/notifications"
      />

      <NavItem
        navSize={navSize}
        icon={IoPersonSharp}
        title="Profile"
        link="/profile"
      />
    </Sidebar>
  );
};