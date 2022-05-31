import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const StudentNewTicket = () => {
  const [ticketData, updateTicketData] = useState({
    type: "1",
    subject: "",
    message: "",
    other_info: "",
    attachment: null,
  });

  const [showSubjectField, setShowSubjectField] = useState(false);
  const [showOtherInfoField, setShowOtherInfoField] = useState(false);
  const [detailsLabel, setDetailsLabel] = useState("Reason");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { canReport, setCanReport } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const api = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "CONNECT | Open a ticket";

    const getCanReportPerm = async () => {
      const response = await api.get("/api/student-ticket/can_report_perm");
      return response.data;
    };

    getCanReportPerm()
      .then((res) => {
        setCanReport(res["report_perm"] ? res["report_perm"] : false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const changeHandler = (e) => {
    if (e.target.name === "attachment") {
      let image = e.target.files[0];

      if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("Select a valid image");
        e.target.value = null;
        image = null;
      }
      updateTicketData({
        ...ticketData,
        [e.target.name]: image,
      });
    } else {
      updateTicketData({
        ...ticketData,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "type") {
      const ticket_type = parseInt(e.target.value);

      if (ticket_type === 1) {
        setShowOtherInfoField(false);
        setShowSubjectField(false);
        setDetailsLabel("Balance Reason");
        updateTicketData({
          ...ticketData,
          ["type"]: ticket_type,
          ["subject"]: "",
          ["other_info"]: "",
        });
      } else if (ticket_type === 7) {
        setShowOtherInfoField(false);
        setShowSubjectField(true);
        setDetailsLabel("Concern Details");
        updateTicketData({
          ...ticketData,
          ["type"]: ticket_type,
          ["other_info"]: "",
        });
      } else {
        setShowOtherInfoField(true);
        setShowSubjectField(false);
        setDetailsLabel("Concern Details");
        updateTicketData({
          ...ticketData,
          ["type"]: ticket_type,
          ["subject"]: "",
        });
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(ticketData);
    api
      .post(
        `/api/student-ticket/`,
        {
          type: ticketData.type,
          subject: ticketData.subject,
          message: ticketData.message,
          other_info: ticketData.other_info,
          attachment: ticketData.attachment,
        },
        { headers: { "content-type": "multipart/form-data" } }
      )
      .then((res) => {
        // console.log(res.data);
        setCanReport(false);
        onOpen();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <Modal
        onClose={onClose}
        size="md"
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report submitted</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Ticket has been forwarded to evaluators.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" color="orange.400" onClick={() => navigate("/dashboard")}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <UserLayout>
        {canReport === true ? (
          <Stack m={5} spacing={5}>
            <Center>
              <Heading fontSize="xl">Open New Incident Ticket</Heading>
            </Center>
            <Center>
              <Box bg="white" p={5} borderRadius="10px" box-shadow="md">
                <Stack spacing={4}>
                  <Stack as="form" onSubmit={submitHandler}>
                    <Stack spacing={4} mb={10}>
                      <FormControl isRequired>
                        <FormLabel>Type</FormLabel>
                        <Select name="type" onChange={changeHandler}>
                          <option value={1}>Remaining balance</option>
                          <option value={2}>Failed a subject</option>
                          <option value={3}>
                            Adding/changing of subject/s
                          </option>
                          <option value={4}>Subjects with INC mark</option>
                          <option value={5}>
                            Subjects from lower year level not taken yet
                          </option>
                          <option value={6}>
                            Subjects that are not available on the current
                            semester not yet taken
                          </option>
                          <option value={7}>Others</option>
                        </Select>
                      </FormControl>

                      {showSubjectField && (
                        <FormControl isRequired>
                          <FormLabel>Concern</FormLabel>
                          <Input
                            type="text"
                            name="subject"
                            placeholder="Specify your concern"
                            onChange={changeHandler}
                          />
                        </FormControl>
                      )}

                      <FormControl isRequired>
                        <FormLabel>{detailsLabel}</FormLabel>
                        <Textarea
                          placeholder="Please describe your concern in no more than 500 characters."
                          onChange={changeHandler}
                          name="message"
                          maxLength={500}
                          rows={10}
                        ></Textarea>
                      </FormControl>

                      {showOtherInfoField && (
                        <FormControl isRequired>
                          <FormLabel>Enter course subject/s</FormLabel>
                          <Input
                            type="text"
                            name="other_info"
                            onChange={changeHandler}
                          />
                        </FormControl>
                      )}

                      <FormControl>
                        <FormLabel>Attachment</FormLabel>
                        <Input
                          type="file"
                          name="attachment"
                          accept="image/*"
                          onChange={changeHandler}
                        />
                      </FormControl>
                    </Stack>

                    <Stack spacing={10}>
                      <Button
                        bg={"orange.400"}
                        color={"white"}
                        _hover={{
                          bg: "orange.500",
                        }}
                        type="submit"
                        // isLoading={isSubmitting}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Center>
          </Stack>
        ) : (
          <Stack m={5} spacing={5}>
            <Text
              fontWeight={600}
              textAlign="center"
              fontSize="xl"
              color="gray.500"
              w="full"
            >
              You currently have 1 ongoing ticket.
              <br /> Please wait for the resolution before submitting a new one.
            </Text>
          </Stack>
        )}
      </UserLayout>
    </>
  );
};

export default StudentNewTicket;
