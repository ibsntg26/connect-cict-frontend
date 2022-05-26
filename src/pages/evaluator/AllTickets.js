import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
// import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import UserLayout from "../../components/UserLayout";
import AllTicketsTable from "../../components/AllTicketsTable";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const EvaluatorAllTickets = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [query, setQuery] = useState("");
  const api = useAxios();

  const getTickets = async () => {
    const response = await api.get("/api/ticket/");
    return response.data;
  };

  const search = (rows) => {
    const query_lower = query.toLowerCase();
    return rows.filter(
      (row) =>
        row.student.section.toLowerCase().indexOf(query_lower) > -1 ||
        row.student.year_level.toLowerCase().indexOf(query_lower) > -1 ||
        row.type.name.toLowerCase().indexOf(query_lower) > -1
    );
  };

  useEffect(() => {
    document.title = "CONNECT | All Tickets";
    setIsLoading(true);
    getTickets()
      .then((res) => {
        setTickets(res);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });

    setIsLoading(false);
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
              {/* <Text fontWeight={600}>Filter by</Text> */}
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
                    borderColor: "orange.400"
                  }}
                  placeholder="Search..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </InputGroup>
              {/* <FormControl>
                <FormLabel>Section</FormLabel>
                <Select name="section" {...register("year_level")}>
                  {year_levels.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl> */}
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: "1", md: "3" }}>
          <Box bg="white" h="full" p={2} borderRadius="10px">
            <AllTicketsTable ticketsData={search(tickets)} />
          </Box>
        </GridItem>
      </Grid>
    </UserLayout>
  );
};

export default EvaluatorAllTickets;
