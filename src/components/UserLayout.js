import React, { useContext } from "react";
import { Flex, Grid } from "@chakra-ui/react";

import UserSidebar from "./UserSidebar";
import LayoutContext from "../context/layout-context";

export default function UserLayout({ children }) {
  const { sidebarWidth } = useContext(LayoutContext);
  return (
    <Flex bg={"gray.100"} color="gray.800">
      <UserSidebar />
      {/* <Flex
        flexDir="column"
        w="100%"
        h={"100vh"}
        marginLeft={sidebarWidth}
        transition="width 0.15s ease-in-out"
      >
        {children}
      </Flex> */}

      <Grid
        minH="100vh"
        p={3}
        w="100%"
        marginLeft={sidebarWidth}
        transition="width 0.15s ease-in-out"
      >
        {children}
      </Grid>
    </Flex>
  );
}
