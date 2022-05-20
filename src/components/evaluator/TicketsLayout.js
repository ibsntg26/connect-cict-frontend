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
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import UserLayout from "../UserLayout";
import EvaluatorTicketView from "./TicketItem";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

export default function EvaluatorTicketsLayout({ children }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [evaluatorTickets, setEvaluatorTickets] = useState([]);
  const [reportedTickets, setReportedTickets] = useState([]);
  const api = useAxios();

  useEffect(() => {
    document.title = "CONNECT | Tickets";
    setIsLoading(true);
    const getEvaluatorTickets = async () => {
      const response = await api.get("/api/evaluator-ticket/");
      return response.data;
    };

    const getReportedTickets = async () => {
      const response = await api.get("/api/ticket/exclude_current/");
      return response.data;
    };

    getEvaluatorTickets()
      .then((res) => {
        setEvaluatorTickets(res);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    getReportedTickets()
      .then((res) => {
        setReportedTickets(res);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    setIsLoading(false);
  }, []);

  return (
    <UserLayout>
      <Grid maxH="95vh" p={3}>
        <HStack w="full" spacing={0} align="flex-start">
          <VStack align="flex-start" h="full" borderRight="2px solid #ddd">
            <Box w={325} h="full" py={4}>
              <Heading size="lg" mb={2}>
                Tickets
              </Heading>
              <Divider borderBottom="2px solid #ddd" />

              <Box mt={5}>
                <Tabs isFitted variant="enclosed" colorScheme="orange">
                  <TabList mb="1em">
                    <Tab>All Tickets</Tab>
                    <Tab>My Tickets</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel px={0} py={0}>
                      {reportedTickets.map((ticket) => (
                        <EvaluatorTicketView
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
                    </TabPanel>
                    <TabPanel px={0} py={0}>
                      {evaluatorTickets.map((ticket) => (
                        <EvaluatorTicketView
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
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </VStack>
          <VStack w="full" h="full" bg="gray.100">
            {children}
          </VStack>
        </HStack>
      </Grid>
    </UserLayout>
  );
}
