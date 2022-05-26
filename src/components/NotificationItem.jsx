import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";

import AuthContext from "../context/auth-context";

export default function NotificationItem(props) {
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  return (
    <Box
      borderLeftWidth="5px"
      borderColor="orange.500"
      boxShadow="md"
      p={{ base: "3", md: "4" }}
      rounded="md"
      bg="white"
      onClick={
        props.ticket &&
        (() => {
          role !== 'admin' ? navigate(`/tickets/${props.ticket}`) : navigate(`/admin/tickets/${props.ticket}`);
        })
      }
      cursor="pointer"
      _hover={{
        backgroundColor: "gray.100",
        color: "gray.800",
      }}
    >
      <Flex >
        <Avatar
          w="60px"
          h="60px"
          src={props.pic}
          alt={props.name}
          me={{ base: "3", md: "6" }}
        />
        <Box>
          <Heading fontSize="md">Ticket #{props.ticket}</Heading>
          <Text fontSize="sm" mb={2}>
            {props.message}
          </Text>
          {/* <Text fontSize="xs">{dayjs(props.date).format("MMMM D, YYYY")}</Text> */}
          <Text fontSize="xs">{dayjs(props.date).fromNow()}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
