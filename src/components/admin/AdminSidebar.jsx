import React, { useContext } from "react";
import { IoHomeSharp, IoPeopleSharp, IoFolderSharp, IoTicketSharp, IoNotificationsSharp, IoPersonSharp, } from "react-icons/io5";
import Sidebar from "../Sidebar";
import NavItem from "../NavItem";

import LayoutContext from "../../context/layout-context";

export default function AdminSidebar() {
  const { navSize } = useContext(LayoutContext);

  return (
    <Sidebar>
      <NavItem
        navSize={navSize}
        icon={IoHomeSharp}
        title="Dashboard"
        link="/admin/dashboard"
      />

    <NavItem
        navSize={navSize}
        icon={IoPeopleSharp}
        title="User Management"
        link="/admin/users"
      />

      <NavItem
        navSize={navSize}
        icon={IoFolderSharp}
        title="All Tickets"
        link="/admin/tickets/all/"
      />

      <NavItem
        navSize={navSize}
        icon={IoTicketSharp}
        title="Assigned Tickets"
        link="/admin/tickets"
      />

      <NavItem
        navSize={navSize}
        icon={IoNotificationsSharp}
        title="Notifications"
        link="/admin/notifications"
      />

      <NavItem
        navSize={navSize}
        icon={IoPersonSharp}
        title="Profile"
        link="/admin/profile"
      />
    </Sidebar>
  );
}
