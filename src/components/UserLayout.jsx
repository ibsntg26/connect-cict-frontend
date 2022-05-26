import React, { useContext } from "react";
import { Flex, Grid } from "@chakra-ui/react";
import StudentSidebar from "./student/StudentSidebar";
import EvaluatorSidebar from "./evaluator/EvaluatorSidebar";
import AdminSidebar from "./admin/AdminSidebar";

import AuthContext from "../context/auth-context";
import LayoutContext from "../context/layout-context";

export default function UserLayout({ children }) {
  const { role } = useContext(AuthContext);
  const { sidebarWidth } = useContext(LayoutContext);

  return (
    <Flex bg="gray.50" color="gray.800">
      {role === "student" ? <StudentSidebar /> : (role === "evaluator" ? <EvaluatorSidebar /> : <AdminSidebar />)}

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
        h="100vh"
        p={3}
        w="100%"
        marginLeft={{ base: "10vh", md: sidebarWidth }}
        // marginLeft="10vh"
        overflow={{ base: "auto", md: "hidden" }}
        transition="width 0.15s ease-in-out"
      >
        {children}
      </Grid>
    </Flex>
  );
}
