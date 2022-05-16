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
  HStack,
  VStack,
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
              <FormLabel fontSize="30px" ml="15">
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
            <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
