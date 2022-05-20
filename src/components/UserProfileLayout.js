import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  SimpleGrid,
  Box,
  Heading,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Image,
  Button,
} from "@chakra-ui/react";

import UserLayout from "./UserLayout";

const UserProfileLayout = ({children}) => {
  return (
    <UserLayout>
      <Stack m={3} spacing={5}>
        <Heading fontSize="3xl" paddingTop={5}>
          Profile
        </Heading>
        <SimpleGrid columns={2} minChildWidth="375px" spacing={5} lineHeight={1.25}>
            {children}
        </SimpleGrid>
      </Stack>
    </UserLayout>
  );
};

export default UserProfileLayout;
