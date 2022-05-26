import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Button, Grid, GridItem, Heading, Box } from "@chakra-ui/react";
import { IoIosAddCircle } from "react-icons/io";
import UserLayout from "../UserLayout";
import StudentTicketItem from "./StudentTicketItem";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

export default function StudentTicketsLayout({ children }) {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const { setCanReport, canReport } = useContext(AuthContext);
  const api = useAxios();

  const getTickets = async () => {
    const response = await api.get("/api/student-ticket/");
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

    const getCanReportPerm = async () => {
      const response = await api.get("/api/student-ticket/can_report_perm");
      return response.data;
    };

    getCanReportPerm()
      .then((res) => {
        setCanReport(res["report_perm"] ? res["report_perm"] : false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      {/* <div>{children}</div> */}

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
              Reported Incidents{" "}
              {tickets.length > 0 && "(" + tickets.length + ")"}
              {/* <Tag bg="gray.600" color="white" ms="2">
                {tickets.length}
              </Tag> */}
            </Heading>

            {canReport === true && (
              <Link to="/tickets/new/">
                <Button
                  colorScheme="orange"
                  leftIcon={<IoIosAddCircle />}
                  size="sm"
                  me={2}
                >
                  New ticket
                </Button>
              </Link>
            )}
          </Flex>

          <Box overflow="auto" h="90vh">
            <Box mt={5} me={5}>
              {tickets.map((ticket) => (
                <StudentTicketItem
                  key={ticket.id}
                  id={ticket.id}
                  label={ticket.subject}
                  name={user.name}
                  pic={user.picture}
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
