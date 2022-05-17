import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useParams, Link } from "react-router-dom";

import { BsCheckLg } from "react-icons/bs";

import {
  Flex,
  Button,
  SimpleGrid,
  Heading,
  Box,
  VStack,
  Text,
  Tooltip,
  Divider,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

import StudentTicketsLayout from "../../components/student/TicketsLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Ticket = () => {
  const { user } = useContext(AuthContext);
  const [ticketInfo, setTicketInfo] = useState("");
  const [ticketType, setTicketType] = useState("");

  const api = useAxios();
  const { ticketId } = useParams();

  const getTicketDetails = async () => {
    const response = await api.get(`/api/student-ticket/${ticketId}/`);
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Ticket";
    getTicketDetails()
      .then((res) => {
        let ticket = res;
        let type = "";

        res.message !== "Other" ? (type = res.type.name) : (type = res.subject);
        delete ticket.type;

        setTicketInfo(ticket);
        setTicketType(type);
        // console.log(ticketInfo);
      })
      .catch((e) => {
        alert(e.message);
      });

    // insert get followups
  }, []);

  return (
    <StudentTicketsLayout>
      <VStack w="full" h="full">
        <Box h="full" w="full">
          <Box w="full" p={8}>
            <Flex justifyContent="space-between">
              <Flex>
                <Heading fontSize="2xl" maxW={500} me={4} noOfLines={1}>
                  Ticket #{ticketInfo.id} - {ticketType}
                </Heading>
                <Tag size="lg" colorScheme="orange" borderRadius="full">
                  <TagLabel textTransform="capitalize">
                    {ticketInfo.status}
                  </TagLabel>
                </Tag>
              </Flex>

              {ticketInfo.status === "open" ||
              ticketInfo.status === "processing" ? (
                <Box>
                  <Tooltip hasArrow label="Close report">
                    <Button
                      size="sm"
                      fontSize="xl"
                      variant="ghost"
                      color="green.500"
                      _hover={{
                        color: "green.700",
                      }}
                    >
                      <BsCheckLg />
                    </Button>
                  </Tooltip>
                </Box>
              ) : null}
            </Flex>
            <SimpleGrid columns={3} gap={5} mt={5}>
              {/* <Box>
                <Text fontSize="sm">Evaluator</Text>
                <Text as="b" fontSize="large">
                  {ticketInfo.evaluator}
                </Text>
              </Box> */}
              <Box>
                <Text fontSize="sm">Date opened</Text>
                <Text as="b" fontSize="large">
                  {dayjs(ticketInfo.date).format("MMMM D, YYYY")}
                </Text>
              </Box>

              {ticketInfo.status === "closed" && (
                <Box>
                  <Text fontSize="sm">Date closed</Text>
                  <Text as="b" fontSize="large">
                    {dayjs(ticketInfo.date).format("MMMM D, YYYY")}
                  </Text>
                </Box>
              )}
              <Box>
                <Text fontSize="sm">Attachment</Text>
                <a href={ticketInfo.attachment} target="_blank">
                  <Text noOfLines={1}>See attached file</Text>
                </a>
              </Box>
            </SimpleGrid>
            <Box w="full" mt={8}>
              <Text fontSize="sm">Description</Text>
              <Text fontWeight={600}>{ticketInfo.message}</Text>
            </Box>
            <Divider borderBottom="2px solid #ddd" mt={8} />
            <Box h="full" w="full" mt={4}>
              Message goes here
            </Box>
          </Box>
        </Box>
      </VStack>
    </StudentTicketsLayout>
  );
};

export default Ticket;
