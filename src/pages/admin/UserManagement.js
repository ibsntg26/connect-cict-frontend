import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosAddCircle, IoIosSearch } from "react-icons/io";
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
import AllEvaluatorsTable from "../../components/admin/AllEvaluatorsTable";

import axios from "axios";

const AdminUserManagement = () => {
  const [evaluators, setEvaluators] = useState([]);

  const getEvaluators = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/user/evaluator/"
    );
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | All Evaluators";
    getEvaluators()
      .then((res) => {
        setEvaluators(res);
        // console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Box bg="white" p={4} borderRadius="10px" overflow="auto" h="95vh">
        <Flex justifyContent="space-between">
          <Heading size="md">Evaluators</Heading>
          <Link to="/admin/users/evaluator/new/">
            <Button
              colorScheme="orange"
              leftIcon={<IoIosAddCircle />}
              size="sm"
            >
              Add evaluator
            </Button>
          </Link>
        </Flex>

        <Box mt={5}>
          <AllEvaluatorsTable evaluatorsData={evaluators} />
        </Box>
      </Box>
    </UserLayout>
  );
};

export default AdminUserManagement;
