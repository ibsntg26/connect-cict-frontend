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
                    <Box flex='1' textAlign='left'>
                        How to Create an Account?
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                Creating an Account for Incident Report will help the students to report
                what is the problem they encounter at school, such as, adding or
                changing subject, INC and more (can see at Incident Types).
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Creating an Account for Student.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                Click the “LogIn/Register” button. If the user have an account, they
                can proceed to the LogIn, and the user need to register if they
                don't have an account.{' '}
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    These are the information needed of the student to create an
                    account:{' '}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <UnorderedList pl={3} pt={3}>
                    <ListItem>Email address (used as username)</ListItem>
                    <ListItem>Password</ListItem>
                    <ListItem>Student Number</ListItem>
                    <ListItem>First Name</ListItem>
                    <ListItem>Last Name</ListItem>
                    <ListItem>Middle Initial (Optional)</ListItem>
                    <ListItem>Year Level</ListItem>
                    <ListItem>Section</ListItem>
                  </UnorderedList>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                    Creating an Account for Evaluator.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Evaluator need to request an account from the admin or local registrar
                  to manage and record the incident report of the students.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      How to Create an Incident Report.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Writing an Incident Report should be specific and direct to the point
                  statement. Provide all the information needed to solve immediately.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Steps on Creating an Incident Report.
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>

                <OrderedList>
                  <ListItem>
                    Click the “Submit an Incident” button to direct you to the file
                    report.{' '}
                  </ListItem>
                  <ListItem pt={3}>
                    You should select what incident type are you going to write. It
                    should be correct and connected to the problem you encounter.{' '}
                  </ListItem>
                  <ListItem pt={3}>
                    Write a clean and clear statement in the file report. Most of the
                    mistake are due to misspelling and wrong grammar. Provide more
                    specific on what’s the problem to avoid confusion. Always proofread
                    your report to see the errors before you submit.
                  </ListItem>
                  <ListItem pt={3}>
                    Please include if you have photos or files to be proof to your
                    report
                  </ListItem>
                </OrderedList>
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
