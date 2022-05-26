import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Avatar, Badge, Box, Button, Collapse, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Table, TableContainer, Thead, Tbody, Tr, Th, Td, Text, useDisclosure, } from "@chakra-ui/react";

import AuthContext from "../context/auth-context";
import useAxios from "../utils/axios";

export default function AllTicketsTable({ ticketsData }) {
  const { user } = useContext(AuthContext);
  const [ticketInfo, setTicketInfo] = useState("");
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const api = useAxios();
  const navigate = useNavigate();

  const processTicket = async (ticketId) => {
    await api
      .patch(`/api/ticket/${ticketId}/`)
      .then((res) => {
        navigate(`/tickets/${ticketId}`);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const openTicket = (ticket) => {
    setTicketInfo(ticket);
    setShow(false);
    onOpen();
  };

  return (
    <>
      {ticketInfo && (
        <Modal
          onClose={onClose}
          size="xl"
          isOpen={isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Ticket #{ticketInfo.id} - {ticketInfo.subject}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SimpleGrid columns={2} mb={6}>
                <Box>
                  <Text fontSize="sm">Reported by</Text>
                  <Text fontWeight={600}>
                    {`${ticketInfo.student.account.first_name} ${ticketInfo.student.account.middle_initial}. ${ticketInfo.student.account.last_name}`}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm">Processed by</Text>
                  <Text fontWeight={600}>
                    {ticketInfo.evaluator
                      ? `${ticketInfo.evaluator.account.first_name} ${ticketInfo.evaluator.account.last_name}`
                      : "_"}
                  </Text>
                </Box>
              </SimpleGrid>

              <SimpleGrid columns={2} mb={6}>
                <Box>
                  <Text fontSize="sm">Opened on</Text>
                  <Text fontWeight={600}>
                    {dayjs(ticketInfo.date_created).format(
                      "D MMMM YYYY h:mm A"
                    )}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="sm">
                    {ticketInfo.status === "closed"
                      ? "Closed on"
                      : "Last update"}
                  </Text>
                  <Text fontWeight={600}>
                    {dayjs(
                      ticketInfo.status === "closed"
                        ? ticketInfo.date_completed
                        : ticketInfo.date_updated
                    ).format("D MMMM YYYY h:mm A")}
                  </Text>
                </Box>
              </SimpleGrid>

              <Box mb={6}>
                <Text fontSize="sm">
                  {ticketInfo.type.id === 1 ? "Balance reason" : "Concern details"}
                </Text>
                <Collapse startingHeight={25} in={show} fontWeight={600}>
                  {ticketInfo.message}
                </Collapse>
                <Button size="xs" variant="link" onClick={() => setShow(!show)}>
                  Show {show ? "Less" : "More"}
                </Button>
              </Box>

              {ticketInfo.other_info && (
                <Box mb={6}>
                  <Text fontSize="sm">Additional info</Text>
                  <Text fontWeight={600}>{ticketInfo.other_info}</Text>
                </Box>
              )}

              {/* show resolution here */}
            </ModalBody>

            <ModalFooter>
              {ticketInfo.status === "open" && (
                <Button
                  size="sm"
                  onClick={() => {
                    processTicket(ticketInfo.id);
                  }}
                >
                  Process
                </Button>
              )}

              {ticketInfo.status === "processing" &&
                user.evaluator_id === ticketInfo.evaluator.employee_id && (
                <Link to={`/tickets/${ticketInfo.id}`}>
                  <Button size="sm">View full details</Button>
                </Link>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Reported by</Th>
              <Th>Concern</Th>
              <Th>Date opened</Th>
              <Th>Processed by</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ticketsData.length > 0 ? (
              ticketsData.map((ticket) => (
                <Tr
                  key={ticket.id}
                  cursor="pointer"
                  _hover={{
                    backgroundColor: "gray.100",
                  }}
                  onClick={() => {
                    openTicket(ticket);
                  }}
                >
                  <Td py={3}>
                    <Flex>
                      <Avatar
                        name={ticket.student.account.first_name}
                        src={ticket.student.account.profile_picture}
                        me={2}
                      />
                      <Flex flexDir="column" justify="center">
                        <Text fontWeight={600}>
                          {`${ticket.student.account.first_name} ${ticket.student.account.middle_initial}. ${ticket.student.account.last_name}`}
                        </Text>
                        <Text fontSize="xs">
                          {ticket.student.year_level.charAt(0)}
                          {ticket.student.section}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td>
                    {ticket.type.name}{" "}
                    {ticket.type.name === "Others" && `(${ticket.subject})`}
                  </Td>
                  <Td>
                    {dayjs(ticket.date_created).format("D MMMM YYYY h:mm A")}
                  </Td>
                  <Td>
                    {ticket.evaluator
                      ? `${ticket.evaluator.account.first_name} ${ticket.evaluator.account.last_name}`
                      : "_"}
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={ticket.status === "closed" ? "red" : "green"}
                    >
                      {ticket.status}
                    </Badge>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={6} textAlign="center">
                  No incident tickets found.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
