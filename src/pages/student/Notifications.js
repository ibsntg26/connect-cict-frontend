import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Container,
  Grid,
  GridItem,
  Center,
  SimpleGrid,
  Heading,
  Box,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Notifications = () => {
  return (
    <UserLayout>
        Notifications
    </UserLayout>
  )
}

export default Notifications