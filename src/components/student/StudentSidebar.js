import React, { useContext } from "react";

import {
  IoHomeSharp,
  IoTicketSharp,
  IoNotificationsSharp,
  IoPersonSharp,
} from "react-icons/io5";

import LayoutContext from "../../context/layout-context";

import Sidebar from "../Sidebar";
import NavItem from "../NavItem";

export default function StudentSidebar({ children }) {
  const {navSize, sidebarWidth, changeNavSize, changeSidebarWidth} =
    useContext(LayoutContext);

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
}
