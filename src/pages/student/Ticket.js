import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { BsPaperclip } from "react-icons/bs";
import { GoIssueClosed } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { Badge, Box, Button, Center, Collapse, Divider, Flex, FormControl, FormErrorMessage, Grid, GridItem, Image, Input, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, Textarea, VStack, useDisclosure, } from "@chakra-ui/react";
import StudentTicketsLayout from "../../components/student/StudentTicketsLayout";
import ReplyItem from "../../components/ReplyItem";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const StudentTicket = () => {
  const { user } = useContext(AuthContext);
  const [ticketInfo, setTicketInfo] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketReplies, setTicketReplies] = useState([]);
  const [hasAttachment, setHasAttachment] = useState(false);
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    register,
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

  const getTicketReplies = async () => {
    const res = await api.get(`/api/ticket-reply/?ticket=${ticketId}`);
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
          document.querySelector("form").reset();
          populateTicketReplies();
          // alert("Reply has been sent!");
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

        type = res.type.id
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
          size="lg"
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
            <ModalHeader>Close Incident Ticket</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
                {ticketInfo.status === "open"
                  ? "This ticket hasn't been evaluated yet."
                  : "This ticket is still being processed by an evaluator."}{" "}
                Are you sure you want to close this report?
              </Text>
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
        <Grid
          bg="white"
          h="full"
          p={2}
          borderRadius="10px"
          templateRows="repeat(5, 1fr)"
        >
          <GridItem rowSpan={4}>
            <Box overflow="auto" h="70vh" pe={2}>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex>
                  <Heading fontSize="2xl" maxW={500} me={4} noOfLines={1}>
                    {ticketInfo.subject}
                  </Heading>
                  <Text>
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
                  <Box p={1}>
                    <Button
                      colorScheme="red"
                      size="sm"
                      variant="ghost"
                      leftIcon={<GoIssueClosed />}
                      onClick={() => onOpen()}
                    >
                      Close
                    </Button>
                  </Box>
                ) : null}
              </Flex>
              <SimpleGrid columns={3} gap={5} mt={5}>
                {ticketInfo.other_info && (
                  <Box>
                    <Text fontSize="sm">Other info</Text>
                    <Text fontWeight={600}>{ticketInfo.other_info}</Text>
                  </Box>
                )}

                <Box>
                  <Text fontSize="sm">Opened on</Text>
                  <Text fontWeight={600}>
                    {dayjs(ticketInfo.date_created).format(
                      "D MMMM YYYY h:mm A"
                    )}
                  </Text>
                </Box>

                {/* {ticketInfo.status === "processing" && (
                  <Box>
                    <Text fontSize="sm">Last updated on</Text>
                    <Text fontWeight={600}>
                      {dayjs(ticketInfo.date_updated).format(
                        "D MMMM YYYY h:mm A"
                      )}
                    </Text>
                  </Box>
                )}

                {ticketInfo.status === "closed" && (
                  <Box>
                    <Text fontSize="sm">Closed by {ticketInfo.closed_by === 'student' ? 'you' : 'an evaluator'} on</Text>
                    <Text fontWeight={600}>
                      {dayjs(ticketInfo.date_completed).format(
                        "D MMMM YYYY h:mm A"
                      )}
                    </Text>
                  </Box>
                )} */}

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
              <Text fontSize="sm">{ticketType === 1 ? "Balance reason" : "Concern details"}</Text>

                <Collapse startingHeight={25} in={show} fontWeight={600}>
                  {ticketInfo.message}
                </Collapse>
                <Button size="xs" variant="link" onClick={() => setShow(!show)}>
                  Show {show ? "Less" : "More"}
                </Button>
              </Box>
              <Divider borderBottom="2px solid #ddd" my={5} />
              <Box>
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
            </Box>
          </GridItem>
          <GridItem rowSpan={1}>
            <Flex as="form" onSubmit={handleSubmit(sendReply)}>
              <FormControl isInvalid={errors.message} me={5}>
                {/* {hasAttachment === true && (
                <FormHelperText mb={2}>Attachments (1)</FormHelperText>
              )} */}
                <Textarea
                  {...register("message", {
                    required: "A message is required.",
                  })}
                  placeholder="Type your reply here"
                  name="message"
                  maxLength={500}
                  rows={4}
                  bg="white"
                  disabled={ticketInfo.status === "open" || ticketInfo.status === "closed"}
                />
                <FormErrorMessage textAlign="right">
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
                    disabled={ticketInfo.status === "open" || ticketInfo.status === "closed"}
                  />
                </FormControl>

                <Button
                  w={100}
                  variant="link"
                  onClick={() => {
                    document.getElementById("fileInput").click();
                    setHasAttachment(true);
                  }}
                  disabled={ticketInfo.status === "open" || ticketInfo.status === "closed"}
                >
                  <BsPaperclip />
                  Attach file
                </Button>

                <Button
                  w={100}
                  leftIcon={<IoIosSend />}
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={ticketInfo.status === "open" || ticketInfo.status === "closed"}
                >
                  Send
                </Button>
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </StudentTicketsLayout>
    </>
  );
};

export default StudentTicket;
