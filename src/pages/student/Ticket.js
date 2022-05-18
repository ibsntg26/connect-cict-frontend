import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { BsCheckLg, BsPaperclip } from "react-icons/bs";

import {
  Flex,
  Button,
  SimpleGrid,
  Heading,
  Box,
  VStack,
  Text,
  Tooltip,
  Input,
  Badge,
  Divider,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Image,
  Center,
  Textarea,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  HStack,
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
  const [hasAttachment, setHasAttachment] = useState(false);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const api = useAxios();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const {
    isOpen: isAttachmentOpen,
    onOpen: onAttachmentOpen,
    onClose: onAttachmentClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getTicketDetails = async () => {
    const res = await api.get(`/api/student-ticket/${ticketId}/`);
    return res.data;
  };

  const closeTicket = async () => {
    await api
      .patch(`/api/student-ticket/${ticketId}/`)
      .then((res) => {
        window.location.href.indexOf("tickets") > -1
          ? navigate(`/t%C3%ADckets/${ticketId}`)
          : navigate(`/tickets/${ticketId}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const getTicketReplies = async () => {
    const res = await api.get(`/api/ticket-reply/?ticket=${ticketId}`);
    return res.data;
  };

  const populateTicketReplies = () => {
    getTicketReplies()
      .then((res) => {
        setTicketReplies(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const sendReply = async (data) => {
    let flag = true;

    if (data.attachment[0] !== undefined) {
      if (!data.attachment[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("Select a valid image");
        flag = false;
      }
    }

    if (flag) {
      api
        .post(
          `/api/ticket-reply/?ticket=${ticketInfo.id}`,
          {
            message: data.message,
            attachment: data.attachment[0],
          },
          {
            headers: { "content-type": "multipart/form-data" },
          }
        )
        .then((res) => {
          document.getElementById("replyForm").reset();
          populateTicketReplies();
          alert("Reply has been sent!");
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      setHasAttachment(false);
    }
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
      })
      .catch((e) => {
        console.log(e.message);
      });

    populateTicketReplies();
  }, []);

  return (
    <>
      {ticketInfo.attachment && (
        <Modal
          onClose={onAttachmentClose}
          size="md"
          isOpen={isAttachmentOpen}
          motionPreset="slideInBottom"
        >
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
      )}

      {ticketInfo.status !== "closed" && (
        <Modal
          onClose={onClose}
          size="md"
          isOpen={isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Close Ticket Report</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to close this report?</Text>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                No
              </Button>
              <Button variant="ghost" color="orange.400" onClick={closeTicket}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

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
                        onClick={() => onOpen()}
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
                    {dayjs(ticketInfo.date_created).format(
                      "MMMM D, YYYY h:mm a"
                    )}
                  </Text>
                </Box>

                {ticketInfo.status === "closed" && (
                  <Box>
                    <Text fontSize="sm">Date closed</Text>
                    <Text as="b" fontSize="large">
                      {dayjs(ticketInfo.date_completed).format(
                        "MMMM D, YYYY h:mm a"
                      )}
                    </Text>
                  </Box>
                )}
                {ticketInfo.attachment && (
                  <Box>
                    <Text fontSize="sm">Attachment</Text>
                    <Box>
                      <Text
                        as="span"
                        onClick={() => onAttachmentOpen()}
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
                )}
              </SimpleGrid>
              <Box mt={8}>
                <Text fontSize="sm">Description</Text>
                <Text fontWeight={600}>{ticketInfo.message}</Text>
              </Box>
              <Divider borderBottom="2px solid #ddd" mt={8} />
              <Box
                h="full"
                mt={4}
                p={2}
                minH="32vh"
                maxHeight="32vh"
                mb={4}
                overflow="auto"
              >
                {ticketReplies.map((reply) => (
                  <ReplyItem
                    key={reply.id}
                    userFlag={reply.user === user.user_id}
                    message={reply.message}
                    date={reply.date_created}
                    attachment={reply.attachment}
                    resolutionFlag={reply.is_resolution}
                  />
                ))}
              </Box>
              <Box>
                <form id="replyForm" onSubmit={handleSubmit(sendReply)}>
                  <Flex>
                    <FormControl isInvalid={errors.message} me={5}>
                      {hasAttachment === true && (
                        <FormHelperText mb={2}>Attachments (1)</FormHelperText>
                      )}
                      <Textarea
                        {...register("message", {
                          required: "A message is required.",
                        })}
                        placeholder="Type your reply here"
                        name="message"
                        maxLength={500}
                        rows={5}
                        bg="white"
                        disabled={ticketInfo.status === "closed"}
                      />
                      <FormErrorMessage mb={3} textAlign="right">
                        {errors.message && errors.message.message}
                      </FormErrorMessage>
                    </FormControl>

                    <VStack verticalAlign="top" maxW="15vh">
                      <FormControl>
                        {/* <FormLabel>Attachment</FormLabel> */}
                        <Input
                          type="file"
                          name="attachment"
                          accept="image/*"
                          {...register("attachment")}
                          display="none"
                          id="fileInput"
                          disabled={ticketInfo.status === "closed"}
                        />
                      </FormControl>

                      <Button
                        w={100}
                        variant="link"
                        onClick={() => {
                          document.getElementById("fileInput").click();
                          setHasAttachment(true);
                        }}
                        disabled={ticketInfo.status === "closed"}
                      >
                        <BsPaperclip />
                        Attach file
                      </Button>

                      <Button
                        w={100}
                        size="lg"
                        type={"submit"}
                        isLoading={isSubmitting}
                        disabled={ticketInfo.status === "closed"}
                      >
                        Send
                      </Button>
                    </VStack>
                  </Flex>
                </form>
              </Box>
            </Box>
          </Box>
        </VStack>
      </StudentTicketsLayout>
    </>
  );
};

export default Ticket;
