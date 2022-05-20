import React from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import {
  Flex,
  Center,
  SimpleGrid,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Image,
  HStack,
} from "@chakra-ui/react";

export default function NotificationItem({ pic, name, message, date, ticket }) {
  const navigate = useNavigate();

  return (
    <Box
      borderLeftWidth="5px"
      borderColor="orange.500"
      boxShadow="sm"
      w="50vw"
      p={4}
      rounded="md"
      bg="white"
      onClick={
        ticket &&
        (() => {
          navigate(`/tickets/${ticket}`);
        })
      }
      cursor="pointer"
      _hover={{
        backgroundColor: "gray.200",
        color: "gray.800",
      }}
    >
      <Center justifyContent="left">
        <Image
          borderRadius="full"
          boxSize="80px"
          src={pic}
          alt={name}
          me={5}
        />
        <SimpleGrid>
          <HStack>
            <FormLabel fontWeight="bold" fontSize="lg">
              {name}
            </FormLabel>
            {/* <FormLabel paddingBottom="10px" fontSize="md">
              reacted to your post
            </FormLabel> */}
          </HStack>

          <FormControl>
            <FormLabel color="gray.600" fontSize="md">
              {message}
            </FormLabel>
            <FormLabel fontSize="sm">
              {dayjs(date).format("MMMM D, YYYY")}
            </FormLabel>
          </FormControl>
        </SimpleGrid>
      </Center>
    </Box>
  );
}
