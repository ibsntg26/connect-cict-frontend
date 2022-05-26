import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { BsFillLockFill } from "react-icons/bs";

const Forbidden = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" color="gray.700">
      <Flex flexDir="column" alignItems="center">
        <Heading fontSize="8xl">
          <BsFillLockFill />
        </Heading>
        <Box mb={5} />
        <Heading fontSize={{ base: "2xl", md: "4xl" }} mb="2">
          Access to this page is restricted
        </Heading>
        <Text fontSize={{ base: "sm", md: "lg" }}>
          Please check with the admin if you believe this is a mistake.
        </Text>
        <Box my={5} />
        <Link to="/dashboard">
          <Text fontSize={{ base: "sm", md: "md" }}>
            Go back
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Forbidden;
