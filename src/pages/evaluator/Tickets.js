import React from 'react'
import { Text } from "@chakra-ui/react";

import EvaluatorTicketsLayout from '../../components/evaluator/EvaluatorTicketsLayout';

const EvaluatorTickets = () => {
  return (
    <EvaluatorTicketsLayout>
        <Text fontWeight={600} textAlign="center" fontSize="lg" color="gray.400" marginTop={5}>
            Select an incident ticket to process.
        </Text>
    </EvaluatorTicketsLayout>
  )
}

export default EvaluatorTickets;