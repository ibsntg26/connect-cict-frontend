import React from "react";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import UserLayout from "../components/UserLayout";
import HelpCenterAccordion from "../components/HelpCenterAccordion";

import useAxios from "../utils/axios";

const HelpCenter = () => {
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const api = useAxios();

  const getQuestions = async () => {
    const response = await api.get("/api/admin-settings/get_questions/");
    return response.data;
  };

  const search = (rows) => {
    return rows.filter(
      (row) =>
        row.value.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  useEffect(() => {
    document.title = "CONNECT | Help Center";
    getQuestions()
      .then((res) => {
        setQuestions(res);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Box bg="white" p={4} borderRadius="10px" overflow="auto" h="95vh">
        <Center bg="orange.400" h="200" color="white">
          <Stack spacing={4}>
            <FormLabel fontSize="30px" ml="15" color="white">
              What can we help you?{" "}
            </FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<IoIosSearch color="orange" />}
              />
              <Input
                type="search"
                bg="white"
                color="gray.800"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </Stack>
        </Center>
        <Box p="6" rounded="xs">
            <HelpCenterAccordion questionsData={search(questions)} />
        </Box>
      </Box>
    </UserLayout>
  );
};

export default HelpCenter;
