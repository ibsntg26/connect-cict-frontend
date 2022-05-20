import React, { useContext, useEffect, useState } from "react";

import { Text } from "@chakra-ui/react";

import EvaluatorTicketsLayout from "../../components/evaluator/TicketsLayout";

const EvaluatorTickets = () => {
  return (
    <EvaluatorTicketsLayout>
      <Text fontWeight={600} fontSize="lg" color="gray.400" marginTop={5}>
        Select a ticket to view.
      </Text>
    </EvaluatorTicketsLayout>
  );
};

export default EvaluatorTickets;
