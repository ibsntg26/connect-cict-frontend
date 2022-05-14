import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Container,
  Grid,
  GridItem,
  Center,
  SimpleGrid,
  Heading,
  Box,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

import StudentLayout from "../../components/student/StudentLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Dashboard = () => {
  const { user } =
    useContext(AuthContext);

  useEffect(() => {
    document.title = "CONNECT | Dashboard";
  });

  return (
    <StudentLayout>
      <Stack m={5} spacing={5}>
        <Center bg="white" height="15vh" borderRadius="10px" box-shadow="md">
          <Heading fontSize="4xl">Hello, {user.name}</Heading>
        </Center>

        <SimpleGrid minChildWidth="300px" spacing={5} lineHeight={1.25}>
          <Box bg="white" borderRadius="10px" box-shadow="md" padding={5}>
            <Flex justifyContent="space-between">
              <Heading fontSize="lg">Recent Ticket Info</Heading>
              <Link to="/">
                <Text
                  fontSize="sm"
                  color="orange.400"
                  _hover={{ color: "orange.300" }}
                >
                  see full report
                </Text>
              </Link>
            </Flex>

            <Box mt={6}>
              <Text fontSize="sm">Ticket #1122</Text>
              <Text fontWeight={600}>Subject/s not yet taken (OOP2)</Text>
            </Box>

            <SimpleGrid minChildWidth="200px" mt={5}>
              <Box>
                <Text fontSize="sm">Submitted on</Text>
                <Text fontWeight={600}>2022-04-29</Text>
              </Box>
              <Box>
                <Text fontSize="sm">Last update on</Text>
                <Text fontWeight={600}>2022-05-11 by you</Text>
              </Box>
            </SimpleGrid>
          </Box>
          <Box bg="white" borderRadius="10px" box-shadow="md"></Box>
        </SimpleGrid>

        {/* <Box
          bg="white"
          borderRadius="10px"
          box-shadow="md"
          padding={5}
          lineHeight={1.25}
        >
          <Heading fontSize="lg">Recent Help Ticket</Heading>
          <TableContainer mt={5}>
            <Table variant="simple">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box> */}
      </Stack>

      {/* <Heading fontSize="4xl">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, hic corrupti aliquid eveniet quas quaerat, assumenda laboriosam, quae obcaecati velit maxime. Ipsa quidem optio aliquid nobis dolorum, amet laborum libero!
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis sunt voluptatum accusamus maxime illum eum et repellendus earum, deserunt explicabo recusandae quam commodi perspiciatis officiis consequatur esse, temporibus odio amet?
     </Heading>
     <Heading fontSize="4xl">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, hic corrupti aliquid eveniet quas quaerat, assumenda laboriosam, quae obcaecati velit maxime. Ipsa quidem optio aliquid nobis dolorum, amet laborum libero!
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis sunt voluptatum accusamus maxime illum eum et repellendus earum, deserunt explicabo recusandae quam commodi perspiciatis officiis consequatur esse, temporibus odio amet?
     </Heading>
     <Heading fontSize="4xl">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, hic corrupti aliquid eveniet quas quaerat, assumenda laboriosam, quae obcaecati velit maxime. Ipsa quidem optio aliquid nobis dolorum, amet laborum libero!
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis sunt voluptatum accusamus maxime illum eum et repellendus earum, deserunt explicabo recusandae quam commodi perspiciatis officiis consequatur esse, temporibus odio amet?
     </Heading>
     <Heading fontSize="4xl">
       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, hic corrupti aliquid eveniet quas quaerat, assumenda laboriosam, quae obcaecati velit maxime. Ipsa quidem optio aliquid nobis dolorum, amet laborum libero!
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis sunt voluptatum accusamus maxime illum eum et repellendus earum, deserunt explicabo recusandae quam commodi perspiciatis officiis consequatur esse, temporibus odio amet?
     </Heading>  */}
    </StudentLayout>
  );
};

export default Dashboard;
