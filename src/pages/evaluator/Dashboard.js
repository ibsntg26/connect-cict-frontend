import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  GridItem,
  Heading,
  Progress,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Text,
} from "@chakra-ui/react";
import UserLayout from "../../components/UserLayout";

import useAxios from "../../utils/axios";

function card(key, value) {
  return (
    <Box bg="white" rounded="md" shadow="md" p={3}>
      {/* <Text fontWeight={600}>{key}</Text>
      <Text fontSize="3xl" fontWeight={600} align="end" me={5}>
        {value}
      </Text> */}

      <Stat>
        <StatLabel>{key}</StatLabel>
        <StatNumber>{value}</StatNumber>
        {/* <StatHelpText>
          <StatArrow type="increase" />
          23.36%
        </StatHelpText> */}
        <StatHelpText>May 23 - May 29</StatHelpText>
      </Stat>
    </Box>
  );
}

function progressChart(processing, closed) {
  let avg = processing == 0 && closed == 0 ? 0 : Math.round((closed / (processing + closed)) * 100);

  return (
    <Box bg="white" align="center" rounded="md" shadow="md" p={3}>
      <Text fontWeight={600}>Completed Assigned Incident Tickets</Text>
      <CircularProgress value={avg} color="orange.400" size="xs">
        <CircularProgressLabel fontSize="3xl">{avg}%</CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}

function typesChart(balance, subject, others, all) {
  let balance_avg = balance == 0 ? 0 : Math.round((balance / all) * 100);
  let subject_avg = subject == 0 ? 0 : Math.round((subject / all) * 100);
  let others_avg = others == 0 ? 0 : Math.round((others / all) * 100);

  return (
    <Box bg="white" rounded="md" shadow="md" p={3}>
      <Text fontWeight={600}>Assigned Incident Tickets by Type</Text>
      <Box pt={5}>
        <Text>{balance} Remaining balance</Text>
        <Progress colorScheme="green" value={balance_avg} />
      </Box>
      <Box pt={3}>
        <Text>{subject} Subject-related</Text>
        <Progress colorScheme="green" value={subject_avg} />
      </Box>
      <Box pt={3}>
        <Text>{others} Others</Text>
        <Progress colorScheme="green" value={others_avg} />
      </Box>
    </Box>
  );
}

const EvaluatorDashboard = () => {
  const [userNotifications, setUserNotifications] = useState([]);
  const [report, setReport] = useState([]);
  const api = useAxios();
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const getReports = async () => {
    const response = await api.get(`/api/evaluator-ticket/display_report/`);
    return response.data;
  };

  const getNotifications = async () => {
    const response = await api.get(`/api/notification/`);
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Dashboard";
    getReports()
      .then((res) => {
        setReport(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    getNotifications()
      .then((res) => {
        setUserNotifications(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Grid
        h="96vh"
        w="93vw"
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
      >
        <GridItem colSpan={{ base: "1", md: "3" }} p="2">
          <SimpleGrid minChildWidth="150px" spacing="40px" mb={5}>
            {card("New Incidents", report.new)}
            {card("All Open Incidents", report.all_open)}
            {card("My Ongoing Incidents", report.processing)}
            {card("My Closed Incidents", report.closed)}
          </SimpleGrid>
          <SimpleGrid minChildWidth="150px" spacing="40px">
            {progressChart(report.processing, report.closed)}
            {typesChart(report.balance, report.subject, report.others, report.processing + report.closed)}
          </SimpleGrid>
        </GridItem>
        <GridItem p={2}>
          <Grid h="full" ps={{ base: 0, md: 3 }}>
            <Box bg="white" rounded="md" shadow="md" p={3}>
              <Text fontWeight={600} mb={4}>
                Recent updates
              </Text>
              {userNotifications.length > 0 ? (
                userNotifications.map((notification) => (
                  <Flex mb={4} key={notification.id}>
                    <Box>
                      <Text>{notification.message}</Text>
                      <Text fontSize="xs">
                        {dayjs(notification.date_created).fromNow()}
                      </Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text
                  fontWeight={600}
                  textAlign="center"
                  color="gray.400"
                  marginTop={5}
                >
                  No new updates yet.
                </Text>
              )}
            </Box>
          </Grid>
        </GridItem>
        {/* <SimpleGrid minChildWidth="120px" w="full" h="200px" spacing="40px">
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
          <Box bg="tomato" height="80px"></Box>
        </SimpleGrid> */}
      </Grid>
    </UserLayout>
  );
};

export default EvaluatorDashboard;
