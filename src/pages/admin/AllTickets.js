import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Input, InputGroup, InputLeftElement, Select, Text, } from "@chakra-ui/react";
import UserLayout from "../../components/UserLayout";
import AllTicketsTable from "../../components/AllTicketsTable";
import AdminAllTicketsPDF from "../../components/admin/AdminAllTicketsPDF";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const AdminAllTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [yearFilter, setYearFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [reportTypeFilter, setReportTypeFilter] = useState(0);
  const [reportDateFilter, setReportDateFilter] = useState("all");
  const [query, setQuery] = useState("");
  const api = useAxios();
  const sections = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const year_levels = ["1st", "2nd", "3rd", "4th"];

  var weekday = require("dayjs/plugin/weekday");
  dayjs.extend(weekday);

  const getTickets = async () => {
    const response = await api.get("/api/ticket/");
    return response.data;
  };

  const filterYear = (rows) => {
    if (yearFilter === "all") {
      return rows;
    } else {
      return rows.filter(
        (row) => row.student.year_level.toLowerCase().indexOf(yearFilter) > -1
      );
    }
  };

  const filterSection = (rows) => {
    if (sectionFilter !== "all") return rows.filter((row) => row.student.section === sectionFilter);
    return rows;
  };

  const filterType = (rows) => {
    if (typeFilter > 0) return rows.filter((row) => row.type.id == typeFilter);
    return rows;
  };

  const filterStatus = (rows) => {
    if (statusFilter === "all") {
      return rows;
    } else {
      return rows.filter(
        (row) => row.status.toLowerCase().indexOf(statusFilter) > -1
      );
    }
  };

  const filterReportType = (rows) => {
    if (reportTypeFilter > 0) return rows.filter((row) => row.type.id == reportTypeFilter);
    return rows;
  };

  const filterReportDate = (rows) => {
    if (reportDateFilter === "all") {
      return rows;
    } else if (reportDateFilter === "month") {
      return rows.filter(
        (row) =>
          new Date(dayjs().startOf("month")) <= new Date(row.date_created) &&
          new Date(dayjs().endOf("month")) >= new Date(row.date_created)
      );
    } else if (reportDateFilter === "week") {
      return rows.filter(
        (row) =>
          new Date(dayjs().weekday(1)) <= new Date(row.date_created) &&
          new Date(dayjs().weekday(7)) >= new Date(row.date_created)
      );
    } else if (reportDateFilter === "today") {
      return rows.filter(
        (row) =>
          new Date(row.date_created).getDate() == new Date(Date.now()).getDate()
      );
    }
  };

  const search = (rows) => {
    const query_lower = query.toLowerCase();
    return rows.filter(
      (row) =>
        row.student.account.first_name.toLowerCase().indexOf(query_lower) >
          -1 ||
        row.student.account.last_name.toLowerCase().indexOf(query_lower) > -1 ||
        row.student.section.toLowerCase().indexOf(query_lower) > -1 ||
        row.student.year_level.toLowerCase().indexOf(query_lower) > -1 ||
        row.type.name.toLowerCase().indexOf(query_lower) > -1 ||
        row.status.toLowerCase().indexOf(query_lower) > -1
    );
  };

  useEffect(() => {
    document.title = "CONNECT | All Tickets";
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
              All Reported Incidents
              {tickets.length > 0 && " (" + tickets.length + ")"}
            </Heading>
          </Flex>

          <Box overflow="auto" h="90vh">
            <Box mt={5} me={5}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<IoIosSearch color="gray.300" />}
                />
                <Input
                  type="text"
                  value={query}
                  variant="flushed"
                  _focus={{
                    borderColor: "orange.400",
                  }}
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>

              <Text fontWeight={600} mt={5} mb={4}>
                Filter search options
              </Text>
              <FormControl mb={3}>
                <FormLabel color="gray.500">Incident type</FormLabel>
                <Select
                  name="type"
                  bg="white"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value={0}>All</option>
                  <option value={1}>Remaining balance</option>
                  <option value={2}>Failed a subject</option>
                  <option value={3}>Adding/changing of subject/s</option>
                  <option value={4}>Subjects with INC mark</option>
                  <option value={5}>
                    Subjects from lower year level not taken yet
                  </option>
                  <option value={6}>
                    Subjects that are not available on the current semester not
                    yet taken
                  </option>
                  <option value={7}>Others</option>
                </Select>
              </FormControl>

              <HStack alignItems="baseline" mb={3}>
                <FormControl>
                  <FormLabel color="gray.500">Student year level</FormLabel>
                  <Select
                    name="year"
                    bg="white"
                    onChange={(e) => setYearFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    {year_levels.map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.500">Student section</FormLabel>
                  <Select
                    name="section"
                    bg="white"
                    onChange={(e) => setSectionFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    {sections.map((section) => (
                      <option value={section} key={section}>
                        {section}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel color="gray.500">Report status</FormLabel>
                <Select
                  name="type"
                  bg="white"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="open">Open</option>
                  <option value="processing">Processing</option>
                  <option value="closed">Closed</option>
                </Select>
              </FormControl>

              <Text fontWeight={600} mt={10} mb={4}>
                Filter report data
              </Text>

              <FormControl mb={3}>
                <FormLabel color="gray.500">Incident type</FormLabel>
                <Select
                  name="type"
                  bg="white"
                  onChange={(e) => setReportTypeFilter(e.target.value)}
                >
                  <option value={0}>All</option>
                  <option value={1}>Remaining balance</option>
                  <option value={2}>Failed a subject</option>
                  <option value={3}>Adding/changing of subject/s</option>
                  <option value={4}>Subjects with INC mark</option>
                  <option value={5}>
                    Subjects from lower year level not taken yet
                  </option>
                  <option value={6}>
                    Subjects that are not available on the current semester not
                    yet taken
                  </option>
                  <option value={7}>Others</option>
                </Select>
              </FormControl>

              <FormControl mb={8}>
                <FormLabel color="gray.500">Date range</FormLabel>
                <Select
                  name="type"
                  bg="white"
                  onChange={(e) => setReportDateFilter(e.target.value)}
                >
                  <option value="all">All-time</option>
                  <option value="month">Current month</option>
                  <option value="week">Current week</option>
                  <option value="today">Today</option>
                </Select>
              </FormControl>

              <Flex justifyContent="end">
                <Button
                  colorScheme="orange"
                  leftIcon={<HiOutlineDocumentReport />}
                  onClick={() =>
                    AdminAllTicketsPDF(
                      filterReportType(filterReportDate(search(tickets)))
                    )
                  }
                  size="sm"
                  alignSelf="end"
                >
                  Generate Report
                </Button>
              </Flex>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: "1", md: "3" }}>
          <Box bg="white" h="full" p={2} borderRadius="10px">
            <AllTicketsTable
              ticketsData={filterYear(
                filterSection(filterType(filterStatus(search(tickets))))
              )}
            />
          </Box>
        </GridItem>
      </Grid>
    </UserLayout>
  );
};

export default AdminAllTickets;
