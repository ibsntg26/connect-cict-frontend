import React, { useState, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Input, Link, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Switch, Text, useDisclosure, } from "@chakra-ui/react";
import AuthFormContainer from "../components/AuthFormContainer";

import axios from "axios";

const UserSignup = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      first_name: "",
      middle_initial: "",
      last_name: "",
      student_id: "",
      year_level: "1st",
      section: "",
    },
  });

  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const year_levels = ["1st", "2nd", "3rd", "4th"];

  const registerUser = async (data) => {
    data = {
      ...data,
      student: {
        student_id: data.student_id,
        year_level: data.year_level,
        section: data.section,
      },
    };

    delete data.student_id;
    delete data.year_level;
    delete data.section;

    axios
      .post("http://localhost:8000/api/user/student/", data)
      .then((res) => {
        document.querySelector("form").reset();
        onOpen();
      })
      .catch((err) => {
        const err_data = err.response.data;
        if (err_data.student !== undefined) {
          setError("student_id", {
            message: err_data.student.student_id[0],
          });
        }
        if (err_data.email !== undefined) {
          setError("email", {
            message: err_data.email[0],
          });
        }
        if (err_data.password !== undefined) {
          setError("password", {
            message: err_data.password[0],
          });
        }
      });
  };

  useEffect(() => {
    document.title = "CONNECT | Sign Up";
  }, []);

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
          <ModalHeader>Sign up success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You can now log in to your account</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              as={ReactLink}
              to="/signin"
              variant="ghost"
              color="orange.400"
            >
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AuthFormContainer headingText="Create your account to start now">
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <Stack as="form" onSubmit={handleSubmit(registerUser)}>
              <Stack spacing={4} mb={10}>
                <FormControl isInvalid={errors.first_name}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    {...register("first_name", {
                      required: "Enter your first name",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.first_name && errors.first_name.message}
                  </FormErrorMessage>
                </FormControl>

                <HStack alignItems="baseline">
                  <FormControl maxWidth={110} isInvalid={errors.middle_initial}>
                    <FormLabel>Middle Initial</FormLabel>
                    <Input
                      type="text"
                      name="middle_initial"
                      maxLength={3}
                      {...register("middle_initial")}
                    />
                  </FormControl>

                  <FormControl isInvalid={errors.last_name}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      {...register("last_name", {
                        required: "Enter your last name",
                      })}
                    />
                    <FormErrorMessage>
                      {errors.last_name && errors.last_name.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>

                <FormControl isInvalid={errors.student_id}>
                  <FormLabel>Student ID Number</FormLabel>
                  <Input
                    type="number"
                    name="student_id"
                    {...register("student_id", {
                      required: "Enter your student number",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.student_id ? (
                    <FormErrorMessage mb={3}>
                      {errors.student_id && errors.student_id.message}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>Use the format 2022XXXXXX</FormHelperText>
                  )}
                </FormControl>

                <HStack alignItems="baseline">
                  <FormControl isInvalid={errors.year_level}>
                    <FormLabel>Year Level</FormLabel>
                    <Select
                      name="year_level"
                      {...register("year_level", {
                        required: "Select your year level",
                      })}
                    >
                      {year_levels.map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage mb={3}>
                      {errors.year_level && errors.year_level.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={errors.section}>
                    <FormLabel>Section</FormLabel>
                    <Input
                      type="text"
                      name="section"
                      maxLength={1}
                      {...register("section", {
                        required: "Enter your section",
                      })}
                    />
                    <FormErrorMessage mb={3}>
                      {errors.section && errors.section.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>

                <FormControl mb={2} isInvalid={errors.email}>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    {...register("email", {
                      required: "Enter your email",
                    })}
                  />
                  <FormErrorMessage mb={3}>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                  <FormHelperText>
                    Use your BulSU email, if necessary.
                  </FormHelperText>
                </FormControl>

                <FormControl mb={2} isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={show ? "text" : "password"}
                    name="password"
                    {...register("password", {
                      required: "Enter a password",
                      minLength: {
                        value: 8,
                        message: "Enter 8 characters or longer",
                      },
                    })}
                  />
                  {errors.password ? (
                    <FormErrorMessage mb={3}>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      Your password must contain at least 8 characters.
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl mb={2} isInvalid={errors.password2}>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type={show ? "text" : "password"}
                    name="password2"
                    {...register("password2", {
                      required: "Re-type password",
                      minLength: {
                        value: 8,
                        message: "Enter 8 characters or longer",
                      },
                    })}
                  />
                  <FormErrorMessage mb={3}>
                    {errors.password2 && errors.password2.message}
                  </FormErrorMessage>
                </FormControl>

                <Switch
                  colorScheme="orange"
                  onChange={() => setShow((show) => !show)}
                >
                  Show password
                </Switch>
              </Stack>

              <Stack spacing={10}>
                <Button type="submit" isLoading={isSubmitting}>
                  Sign up
                </Button>
              </Stack>
            </Stack>

            <Text as="span" textAlign="center" pt={2}>
              Already have an account?
              <Link as={ReactLink} to="/signin" px={1}>
                Sign in
              </Link>
              instead.
            </Text>
          </Stack>
        </Box>
      </AuthFormContainer>
    </>
  );
};

export default UserSignup;
