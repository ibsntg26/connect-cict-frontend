import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
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
  Tag,
  TagLabel,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";
import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Dashboard = () => {
  const { user, setCanReport } = useContext(AuthContext);
  const [recentTicket, updateRecentTicket] = useState([]);
  const [ticketType, updateTicketType] = useState("");

  const api = useAxios();

  useEffect(() => {
    document.title = "CONNECT | Dashboard";

    const getCanReportPerm = async () => {
      const response = await api.get("/api/student-ticket/can_report_perm");
      return response.data;
    };

    const getRecentTicket = async () => {
      const response = await api.get("/api/student-ticket/recent_ticket");
      return response.data;
    };

    getCanReportPerm()
      .then((res) => {
        setCanReport(res["report_perm"] ? res["report_perm"] : false);
      })
      .catch((e) => {
        console.log(e.message);
      });

    getRecentTicket()
      .then((res) => {
        if (res.detail) updateRecentTicket([]);
        else {
          updateRecentTicket(res);
          updateTicketType(res.type.name);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Stack m={5} spacing={5}>
        <Center bg="white" height="15vh" borderRadius="10px" box-shadow="md">
          <Heading fontSize="4xl">Hello, {user.name}</Heading>
        </Center>

        <SimpleGrid minChildWidth="300px" spacing={5} lineHeight={1.25}>
          <Box bg="white" borderRadius="10px" box-shadow="md" padding={5}>
            {ticketType !== "" ? (
              <div>
                <Flex justifyContent="space-between">
                  <Heading fontSize="lg">Recent Ticket Info</Heading>
                  <Link to={"/tickets/" + recentTicket.id}>
                    <Text
                      fontSize="sm"
                      color="orange.400"
                      _hover={{ color: "orange.500" }}
                    >
                      see full report
                    </Text>
                  </Link>
                </Flex>

                <SimpleGrid minChildWidth="200px" mt={6}>
                  <Box>
                    <Text fontSize="sm">Ticket #{recentTicket.id}</Text>
                    <Text fontWeight={600}>{ticketType}</Text>
                  </Box>
                  <Box>
                    <Tag
                      size="lg"
                      colorScheme={
                        recentTicket.status === "closed" ? "red" : "green"
                      }
                      borderRadius="full"
                    >
                      <TagLabel textTransform="uppercase">
                        {recentTicket.status}
                      </TagLabel>
                    </Tag>
                  </Box>
                </SimpleGrid>

                <SimpleGrid minChildWidth="200px" mt={5}>
                  <Box>
                    <Text fontSize="sm">Submitted on</Text>
                    <Text fontWeight={600}>
                      {dayjs(recentTicket.date_created).format(
                        "MMMM D, YYYY h:mm a"
                      )}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">Last update on</Text>
                    <Text fontWeight={600}>
                      {dayjs(recentTicket.date_updated).format(
                        "MMMM D, YYYY h:mm a"
                      )}
                    </Text>
                  </Box>
                </SimpleGrid>
              </div>
            ) : (
              <div>spspsp</div>
            )}
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
    </UserLayout>
  );
};

export default Dashboard;
