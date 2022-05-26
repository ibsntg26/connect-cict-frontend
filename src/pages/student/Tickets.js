import React from "react";
import { Text } from "@chakra-ui/react";

import StudentTicketsLayout from "../../components/student/StudentTicketsLayout";

const StudentTickets = () => {
  return (
    <StudentTicketsLayout>
      <Text fontWeight={600} textAlign="center" fontSize="lg" color="gray.400" marginTop={5}>
        Select an incident ticket to start.
      </Text>
    </StudentTicketsLayout>
  );
};

export default StudentTickets;
