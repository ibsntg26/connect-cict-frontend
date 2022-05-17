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
} from "@chakra-ui/react";

import StudentTicketsLayout from "../../components/student/TicketsLayout";

const Tickets = () => {
  return (
    <StudentTicketsLayout>
      <Text fontWeight={600} fontSize="lg" color="gray.400" marginTop={5}>Select a ticket to view.</Text>
    </StudentTicketsLayout>
  );
};

export default Tickets;
