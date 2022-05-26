import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";

export default function HelpCenterAccordion({ questionsData }) {
  return (
    <Accordion allowToggle>
      {questionsData.length > 0 ? (
        questionsData.map((question) => (
          <AccordionItem key={question.id}>
            <AccordionButton py={4}>
              <Box flex="1" textAlign="left">
                <Text fontSize="16" fontWeight={600}>
                  {(question.value).substring(0, (question.value).indexOf('|'))}
                </Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={6}>
              <Text color="gray.500">{(question.value).substring((question.value).indexOf('|') + 1)}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))
      ) : (
        <Text textAlign="center">No data found.</Text>
      )}
    </Accordion>
  );
}
