import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Link,
  Select,
  Center,
  Button,
  Stack,
  Heading,
  Text,
  Textarea,
  Alert,
  AlertIcon,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

import StudentLayout from "../../components/student/StudentLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const NewTicket = () => {
  const [ticketData, updateTicketData] = useState({
    type: "",
    subject: "",
    message: "",
    other_info: "",
    attachment: null,
  });

  const [showSubjectField, setShowSubjectField] = useState(false);
  const [showOtherInfoField, setShowOtherInfoField] = useState(true);
  const [otherInfoLabel, setOtherInfoLabel] = useState("Reason");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCanReport } =
    useContext(AuthContext);
  const toast = useToast();
  const api = useAxios();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    if (e.target.name == "attachment") {
      updateTicketData({
        ...ticketData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      updateTicketData({
        ...ticketData,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name == "type") {
      const ticket_type = e.target.value;
      if (ticket_type == 7) {
        setShowOtherInfoField(false);
        setShowSubjectField(true);
        updateTicketData({
          ...ticketData,
          ["type"]: ticket_type,
          ["other_info"]: "",
        });
      } else {
        setShowOtherInfoField(true);
        setShowSubjectField(false);
        updateTicketData({
          ...ticketData,
          ["type"]: ticket_type,
          ["subject"]: "",
        });

        if (ticket_type == 1) setOtherInfoLabel("Balance reason");
        else setOtherInfoLabel("Enter subject/s");
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
        console.log(res.data);
        alert("Ticket has been forwarded to the evaluators.");
        setCanReport(false);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <StudentLayout>
      <Stack m={5} spacing={5}>
        <Center>
          <Heading fontSize="3xl">Open new ticket</Heading>
        </Center>
        <Center>
          <Box
            bg="white"
            p={5}
            width="40vw"
            borderRadius="10px"
            box-shadow="md"
          >
            <Stack spacing={4}>
              <form onSubmit={submitHandler}>
                <Stack spacing={4} mb={10}>
                  <FormControl isRequired>
                    <FormLabel>Type</FormLabel>
                    <Select name="type" onChange={changeHandler}>
                      <option value={1}>Remaining balance</option>
                      <option value={2}>Failed a subject</option>
                      <option value={3}>Adding/changing of subject/s</option>
                      <option value={4}>Subjects with INC mark</option>
                      <option value={5}>
                        Subjects from lower year level not taken yet
                      </option>
                      <option value={6}>
                        Subjects that are not available on the current semester
                        not yet taken
                      </option>
                      <option value={7}>Others</option>
                    </Select>
                  </FormControl>

                  {showSubjectField && (
                    <FormControl isRequired>
                      <FormLabel>Subject</FormLabel>
                      <Input
                        type="text"
                        name="subject"
                        placeholder="Specify your concern"
                        onChange={changeHandler}
                      />
                    </FormControl>
                  )}

                  <FormControl isRequired>
                    <FormLabel>Concern details</FormLabel>
                    <Textarea
                      placeholder="Please describe your concern in no more than 200 characters."
                      onChange={changeHandler}
                      name="message"
                      maxLength={200}
                    ></Textarea>
                  </FormControl>

                  {showOtherInfoField && (
                    <FormControl isRequired>
                      <FormLabel>{otherInfoLabel}</FormLabel>
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
                    type={"submit"}
                    // isLoading={isSubmitting}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Center>
      </Stack>
    </StudentLayout>
  );
};

export default NewTicket;