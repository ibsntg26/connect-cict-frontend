import React, { useContext, useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";

import StudentTicketsLayout from "../../components/student/TicketsLayout";

const Tickets = () => {
  return (
    <StudentTicketsLayout>
      <Text fontWeight={600} fontSize="lg" color="gray.400" marginTop={5}>
        Select a ticket to view.
      </Text>
    </StudentTicketsLayout>
  );
};

export default Tickets;
