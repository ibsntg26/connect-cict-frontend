import React, { useContext } from "react";
import { calc, Flex } from "@chakra-ui/react";

import StudentSidebar from "./StudentSidebar";
import LayoutContext from "../../context/layout-context";

export default function StudentLayout({ children }) {
  const { sidebarWidth } = useContext(LayoutContext);
  return (
    <Flex bg={"gray.100"} color="gray.800">
      <StudentSidebar />
      <Flex
        flexDir="column"
        w="100%"
        h={"100vh"}
        marginLeft={sidebarWidth}
        transition="width 0.15s ease-in-out"
      >
        {children}
      </Flex>
    </Flex>
  );
}
