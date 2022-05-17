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
  Badge,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Center,
  Textarea,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import StudentTicketsLayout from "../../components/student/TicketsLayout";
import ReplyItem from "../../components/ReplyItem";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Ticket = () => {
  const { user } = useContext(AuthContext);
  const [ticketInfo, setTicketInfo] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketReplies, setTicketReplies] = useState([]);

  const api = useAxios();
  const { ticketId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getTicketDetails = async () => {
    const response = await api.get(`/api/student-ticket/${ticketId}/`);
    return response.data;
  };

  const getTicketReplies = async () => {
    const response = await api.get(`/api/ticket-reply/?ticket=${ticketId}`);
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

    getTicketReplies()
      .then((res) => {
        setTicketReplies(res);
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

  return (
    <>
      <Modal onClose={onClose} size="md" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Attached File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image src={ticketInfo.attachment} alt={ticketInfo.subject} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <StudentTicketsLayout>
        <VStack w="full" h="full">
          <Box h="full" w="full">
            <Box w="full" p={8}>
              <Flex justifyContent="space-between">
                <Flex>
                  <Heading fontSize="2xl" maxW={500} me={4} noOfLines={1}>
                    Ticket #{ticketInfo.id} - {ticketInfo.subject}
                  </Heading>
                  <Text as="span">
                    <Badge
                    fontSize="md"
                      colorScheme={
                        ticketInfo.status === "closed" ? "red" : "green"
                      }
                    >
                      {ticketInfo.status}
                    </Badge>
                  </Text>
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
                  {/* <a href={ticketInfo.attachment} target="_blank">
                    <Text noOfLines={1}>See attached file</Text>
                  </a> */}
                  <Box>
                    <Text
                      as="span"
                      onClick={() => onOpen()}
                      cursor="pointer"
                      color="orange.400"
                      _hover={{
                        color: "orange.500",
                      }}
                    >
                      See attached file
                    </Text>
                  </Box>
                </Box>
              </SimpleGrid>
              <Box mt={8}>
                <Text fontSize="sm">Description</Text>
                <Text fontWeight={600}>{ticketInfo.message}</Text>
              </Box>
              <Divider borderBottom="2px solid #ddd" mt={8} />
              <Box
                h="full"
                mt={4}
                minH="35vh"
                maxHeight="35vh"
                mb={4}
                overflow="auto"
              >
                {ticketReplies.map((reply) => (
                  <ReplyItem
                    key={reply.id}
                    userFlag={reply.user === user.user_id}
                    message={reply.message}
                    resolutionFlag={reply.is_resolution}
                  />
                ))}
              </Box>
              <Box>
                <FormControl isRequired>
                  <Textarea
                    placeholder="Type your reply here"
                    // onChange={changeHandler}
                    name="message"
                    maxLength={200}
                    rows={5}
                    bg="white"
                  ></Textarea>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </VStack>
      </StudentTicketsLayout>
    </>
  );
};

export default Ticket;
