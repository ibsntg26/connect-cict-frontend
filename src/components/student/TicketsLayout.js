import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import {
  Flex,
  Button,
  Grid,
  SimpleGrid,
  Heading,
  Box,
  HStack,
  VStack,
  Text,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import UserLayout from "../UserLayout";
import StudentTicket from "./TicketItem";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

export default function StudentTicketsLayout({ children }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const { setCanReport, canReport } = useContext(AuthContext);
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

      const getCanReportPerm = async () => {
        const response = await api.get("/api/student-ticket/can_report_perm");
        return response.data;
      };
  
      getCanReportPerm()
        .then((res) => {
          setCanReport(res["report_perm"] ? res["report_perm"] : false);
        })
        .catch((e) => {
          alert(e.message);
        });

    setIsLoading(false);
  }, []);

  return (
    <UserLayout>
      <Grid maxH="95vh" p={3}>
        <HStack w="full" spacing={2} align="flex-start">
          <VStack align="flex-start" h="full" borderRight="2px solid #ddd">
            <Box w={325} h="full" py={4}>
              <Box px={4} mb={2}>
                {canReport == true && (
                  <Link to="/tickets/new">
                    <Button colorScheme="orange" size="md" mb={2} w="full">
                      Open new ticket
                    </Button>
                  </Link>
                )}
              </Box>
              <Heading size="lg" mb={2}>Tickets</Heading>
              <Divider borderBottom="2px solid #ddd" />
              <Box mt={5}>
                {/* {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <StudentTicket
                      key={ticket.id}
                      id={ticket.id}
                      label={ticket.subject}
                      name={user.name}
                      pic={user.picture}
                      date={ticket.date_created}
                      status={ticket.status}
                    />
                  ))
                ) : (
                  <Text>No data.</Text>
                )} */}
                
                {
                tickets.map((ticket) => (
                  <StudentTicket
                    key={ticket.id}
                    id={ticket.id}
                    label={ticket.subject}
                    name={user.name}
                    pic={user.picture}
                    date={ticket.date_created}
                    status={ticket.status}
                  />
                ))
                }
              </Box>
            </Box>
          </VStack>
          <VStack w="full" h="full">
            {children}
          </VStack>
        </HStack>
      </Grid>
    </UserLayout>
  );
}