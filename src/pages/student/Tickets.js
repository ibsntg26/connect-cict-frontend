import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import {
  Flex,
  Button,
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
  Tr,
  Th,
  Td,
  Tag,
  TagLabel,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

import StudentLayout from "../../components/student/StudentLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Tickets = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const { canReport } =
    useContext(AuthContext);
  const api = useAxios();


  useEffect(() => {
    document.title = "CONNECT | Tickets";
    setIsLoading(true);
    const getTickets = async () => {
      const response = await api.get("/api/student-ticket/");
      return response.data;
    };
    getTickets()
      .then((res) => {
        setTickets(res);
        // console.log(res);
      })
      .catch((e) => {
        alert(e.message);
      });

    setIsLoading(false);
  }, []);

  return (
    <StudentLayout>
      <Stack m={5} spacing={5}>
        <Box
          bg="white"
          borderRadius="10px"
          box-shadow="md"
          padding={5}
          lineHeight={1.25}
        >
          <Flex justifyContent="space-between">
            <Heading fontSize="lg">My Help Tickets</Heading>
            <Link to="/tickets/new">
              {canReport == true && (
                <Button size="sm" colorScheme="orange" variant="solid">
                  Open new ticket
                </Button>
              )}
            </Link>
          </Flex>
          <TableContainer mt={8}>
            <Table variant="simple">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Subject</Th>
                  <Th>Concern</Th>
                  <Th>Status</Th>
                  <Th>Date opened</Th>
                  <Th>Date closed</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <Tr key={ticket.id}>
                      <Td>{ticket.subject}</Td>
                      <Td>{ticket.message}</Td>
                      <Td>

                        {ticket.status === 'closed' ? (
                          <Tag
                            size="lg"
                            colorScheme="green"
                            borderRadius="full"
                          >
                            <TagLabel textTransform="capitalize">{ticket.status}</TagLabel>
                          </Tag>
                        ) : (
                          <Tag size="lg" colorScheme="gray" borderRadius="full">
                            <TagLabel textTransform="capitalize">{ticket.status}</TagLabel>
                          </Tag>
                        )}
                      </Td>
                      <Td>
                        {dayjs(ticket.date_created).format(
                          "MMMM D, YYYY h:mm a"
                        )}
                      </Td>
                      <Td>
                        {ticket.date_completed
                          ? dayjs(ticket.date_completed).format(
                              "MMMM D, YYYY h:mm a"
                            )
                          : "-"}
                      </Td>
                      <Td>
                        <Link to={"/tickets/" + ticket.id}>
                          <Text
                            color="orange.400"
                            _hover={{ color: "orange.300" }}
                          >
                            view
                          </Text>
                        </Link>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr><Td colSpan={6} textAlign="center">You haven't submitted any tickets yet.</Td></Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </StudentLayout>
  );
};

export default Tickets;
