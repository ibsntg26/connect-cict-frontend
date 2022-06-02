import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Box, Flex, Grid, GridItem, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Text, } from "@chakra-ui/react";
import UserLayout from "../../components/UserLayout";
import DoughnutChart from "../../components/charts/Doughnut";
import HorizontalBarChart from "../../components/charts/HorizontalBar";

import useAxios from "../../utils/axios";

function card(heading, value, status) {
  var weekday = require("dayjs/plugin/weekday");
  dayjs.extend(weekday);

  return (
    <Box bg="white" rounded="md" shadow="md" p={3}>
      <Stat>
        <StatLabel>{heading}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>
          {status !== null && <StatArrow type={status} />}
          {`${dayjs(dayjs().weekday(1)).format("MMMM D")} - ${dayjs(
            dayjs().weekday(7)
          ).format("MMMM D")}`}
        </StatHelpText>
      </Stat>
    </Box>
  );
}

function progressChart(allIncidentsReportData) {
  return (
    <Box bg="white" rounded="md" shadow="md" p={{ base: "3", md: "5" }}>
      <Text fontWeight={600}>Incident Tickets by Status</Text>
      <Box px={{ base: "1", md: "8" }} py={{ base: "1", md: "4" }}>
        <DoughnutChart
          all_open={allIncidentsReportData.all_open}
          all_my_processing={allIncidentsReportData.all_my_processing}
          all_my_closed={allIncidentsReportData.all_my_closed}
          all_others_processing={allIncidentsReportData.all_others_processing}
        />
      </Box>
    </Box>
  );
}

function typesChart(myIncidentsReportData) {
  return (
    <Box bg="white" rounded="md" shadow="md" p={{ base: "3", md: "5" }}>
      <Text fontWeight={600}>Assigned Incident Tickets by Type</Text>
      <Box py={{ base: "1", md: "4" }} height={270}>
        <HorizontalBarChart
          balance={myIncidentsReportData.balance}
          subject1={myIncidentsReportData.subject1}
          subject2={myIncidentsReportData.subject2}
          subject3={myIncidentsReportData.subject3}
          subject4={myIncidentsReportData.subject4}
          subject5={myIncidentsReportData.subject5}
          others={myIncidentsReportData.others}
        />
      </Box>
    </Box>
  );
}

const EvaluatorDashboard = () => {
  const [userNotifications, setUserNotifications] = useState([]);
  // const [report, setReport] = useState([]);
  const [allIncidentsReportData, setAllIncidentsReportData] = useState([]);
  const [myIncidentsReportData, setMyIncidentsReportData] = useState([]);
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
        setAllIncidentsReportData({
          all_time_open: res.all_time_open,
          all_time_my_processing: res.all_time_my_processing,
          all_time_my_closed: res.all_time_my_closed,
          all_time_by_others: res.all_time_by_others,
          my_processing: res.my_processing,
          my_processing_status: res.my_processing_status,
          my_closed: res.my_closed,
          my_closed_status: res.my_closed_status,
          new: res.new,
          new_status: res.new_status,
          all_open: res.all_open,
          open_status: res.open_status,
        });
        
        setMyIncidentsReportData({
          balance: res.balance,
          subject1: res.subject1,
          subject2: res.subject2,
          subject3: res.subject3,
          subject4: res.subject4,
          subject5: res.subject5,
          others: res.others,
        });
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
            {card(
              "New Incidents",
              allIncidentsReportData.new,
              allIncidentsReportData.new_status
            )}
            {card(
              "All Open Incidents",
              allIncidentsReportData.all_open,
              allIncidentsReportData.open_status
            )}
            {card(
              "My Ongoing Incidents",
              allIncidentsReportData.my_processing,
              allIncidentsReportData.my_processing_status
            )}
            {card(
              "My Closed Incidents",
              allIncidentsReportData.my_closed,
              allIncidentsReportData.my_closed_status
            )}
          </SimpleGrid>
          <SimpleGrid minChildWidth="150px" spacing="40px">
            {progressChart(allIncidentsReportData)}
            {typesChart(myIncidentsReportData)}
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
