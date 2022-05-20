import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Stack,
  AccordionPanel,
  Box,
  Center,
  AccordionIcon,
  FormLabel,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  Grid,
  UnorderedList,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";

import { BiSearchAlt } from "react-icons/bi";

import UserLayout from "../../components/UserLayout";

const HelpCenter = () => {
  return (
    <UserLayout>
      <Grid minH="100vh" p={3} bg="white">
        <Box>
          <Center bg="orange.400" h="200" color="white">
            <Stack spacing={4}>
              <FormLabel fontSize="30px" ml="15" color="white">
                What can we help you?{" "}
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<BiSearchAlt color="orange" />}
                />
                <Input
                  type="search"
                  bg="#ffffff"
                  placeholder="Search"
                  _placeholder={{ opacity: 1, color: "grey.200" }}
                />
                <Button colorScheme="blue" size="md" w="100px" ml="5">
                  Search
                </Button>
              </InputGroup>
            </Stack>
          </Center>
          <Box p="6" rounded="xs">
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How many tickets am I allowed to submit to the system?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  When sending tickets, there is a strict one-at-a-time rule:
                  once you've sent one, you can't send another until the first
                  has been resolved.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What if I have several issues?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  If you're having multiple issues, submit a ticket and explain
                  your issues in the comment section so the evaluator is fully
                  aware of your situation. You may also include pictures to
                  demonstrate your issues. If it isn't applicable, you can send
                  another ticket after your initial one has been resolved or
                  closed.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What if my issue isn't resolved?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Once the evaluator submits a resolution to your filed issue,
                  you are also allowed to reply that your problem still needs to
                  be addressed. If the student is not satisfied with the
                  resolution, the ticket should not be closed.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      How long does it take to get a ticket resolved?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  The time it takes to resolve a ticket is determined by the
                  nature of the issue and the availability of evaluators or the
                  admin; it could take up to 1-2 working days if there are
                  available personnel who are processing the pending requests.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What if no specific ticket exists for my issue?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  In the ticket area, there is an "other" option; select that
                  option and then elaborate your problem in the comment section
                  to thoroughly discuss your issue with the evaluator.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What if I have an issue but lack the necessary information
                      to submit a ticket?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Send your complaint to the local registrar by email them and
                  wait for the response.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      What if it takes so long to settle my submitted ticket?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Try waiting a little longer, and if that doesn't work, inform
                  the local registrar about your filed ticket.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      </Grid>
    </UserLayout>
  );
};

export default HelpCenter;
