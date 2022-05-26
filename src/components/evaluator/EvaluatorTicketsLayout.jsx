import React, { useEffect, useState } from "react";
import { Flex, Grid, GridItem, Heading, Box } from "@chakra-ui/react";
import UserLayout from "../UserLayout";
import EvaluatorTicketItem from "./EvaluatorTicketItem";

import useAxios from "../../utils/axios";

export default function EvaluatorTicketsLayout({ children }) {
  const [tickets, setTickets] = useState([]);
  const api = useAxios();

  const getTickets = async () => {
    const response = await api.get("/api/evaluator-ticket/");
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Tickets";

    getTickets()
      .then((res) => {
        setTickets(res);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Grid
        maxH="100vh"
        p={{ base: 0, md: 3 }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      >
        <GridItem>
          <Flex
            justifyContent="space-between"
            justify="center"
            align="center"
            my={2}
          >
            <Heading size="md">
              Assigned Incidents{" "}
              {tickets.length > 0 && "(" + tickets.length + ")"}
            </Heading>
          </Flex>

          <Box overflow="auto" h="90vh">
            <Box mt={5} me={5}>
              {tickets.map((ticket) => (
                <EvaluatorTicketItem
                  key={ticket.id}
                  id={ticket.id}
                  label={ticket.subject}
                  name={`${ticket.student.account.first_name} ${ticket.student.account.middle_initial}. ${ticket.student.account.last_name}`}
                  pic={ticket.student.account.profile_picture}
                  date_created={ticket.date_created}
                  date_updated={ticket.date_updated}
                  status={ticket.status}
                />
              ))}
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: "1", md: "3" }}>
          <Box bg="white" h="full" p={2} borderRadius="10px">
            {children}
          </Box>
        </GridItem>
      </Grid>
    </UserLayout>
  );
}
