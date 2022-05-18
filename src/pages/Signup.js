import React, { useContext, useState, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Flex,
  Box,
  HStack,
  FormControl,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Select,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Switch,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import LayoutContext from "../context/layout-context";

const Signup = () => {
  const { siteLogoMD } = useContext(LayoutContext);
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    middle_initial: "",
    last_name: "",
    student_id: "",
    year_level: "1st",
    section: "",
  });

  // const [passwordError, setPasswordError] = useState();
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const year_levels = ["1st", "2nd", "3rd", "4th"];

  useEffect(() => {
    document.title = "CONNECT | Sign Up";
  });

  const changeHandler = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  setTimeout(() => {
    setIsSubmitting(false);
  }, 1000);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    //   const response = await fetch("http://127.0.0.1:8000/api/user/student/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       password: formData.password,
    //       password2: formData.password2,
    //       first_name: formData.first_name,
    //       middle_initial: formData.middle_initial,
    //       last_name: formData.last_name,
    //       student: {
    //         student_id: formData.student_id,
    //         year_level: formData.year_level,
    //         section: formData.section,
    //       },
    //     }),
    //   });

    //   const data = await response.json();
    //   if (!response) alert("No server response");
    //   else {
    //     if (response.status === 201) {
    //       toast({
    //         title: "Sign up success!",
    //         description: "You can now log in to your account.",
    //         status: "success",
    //         position: "top",
    //         duration: 5000,
    //         isClosable: true,
    //       });
    //     } else if (response.status === 400) {
    //       console.log(data);
    //       if (data.email) alert("error sa email!");
    //     } else alert("Signup failed.");
    //   }
    // };

    axios
      .post(`http://127.0.0.1:8000/api/user/student/`, {
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        first_name: formData.first_name,
        middle_initial: formData.middle_initial,
        last_name: formData.last_name,
        student: {
          student_id: formData.student_id,
          year_level: formData.year_level,
          section: formData.section,
        },
      })
      .then((res) => {
        // navigate('/');
        toast({
          title: "Sign up success!",
          description: "You can now log in to your account.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        // console.log(res.data);
        // e.target.reset();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Stack spacing={6} mx="auto" maxW="lg" color="gray.700" py={12} px={6}>
        {/* Header */}
        <Stack align="center">
          <Image src={siteLogoMD} maxW="200px" mb={2} />
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Create your account to start now
          </Heading>
        </Stack>

        {/* Form */}
        <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
          {/* {error && (
            <Alert
              status="error"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              mb={5}
            >
              <AlertIcon />
              {error}
            </Alert>
          )} */}
          <Stack spacing={4}>
            <form onSubmit={submitHandler}>
              <Stack spacing={4} mb={10}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    onChange={changeHandler}
                  />
                </FormControl>

                <HStack>
                  <FormControl id="middleInitial" maxWidth={110}>
                    <FormLabel>Middle initial</FormLabel>
                    <Input
                      type="text"
                      name="middle_initial"
                      onChange={changeHandler}
                      maxLength={2}
                    />
                  </FormControl>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      onChange={changeHandler}
                    />
                  </FormControl>
                </HStack>

                <FormControl id="studentId" isRequired>
                  <FormLabel>Student ID number</FormLabel>
                  <Input
                    type="number"
                    name="student_id"
                    onChange={changeHandler}
                  />
                </FormControl>

                <HStack>
                  <FormControl id="yearLevel" maxWidth={110} isRequired>
                    <FormLabel>Year level</FormLabel>
                    <Select name="year_level" onChange={changeHandler}>
                      {year_levels.map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="section" isRequired>
                    <FormLabel>Section</FormLabel>
                    <Input
                      type="text"
                      name="section"
                      onChange={changeHandler}
                      maxLength={1}
                    />
                  </FormControl>
                </HStack>

                <FormControl id="email" mb={2} isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" onChange={changeHandler} />
                </FormControl>

                <FormControl id="password" mb={2} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={show ? "text" : "password"}
                    name="password"
                    onChange={changeHandler}
                    minLength={8}
                  />
                  <FormHelperText>
                    Your password must contain at least 8 characters.
                  </FormHelperText>
                </FormControl>

                <FormControl id="password2" mb={2} isRequired>
                  <FormLabel>Confirm password</FormLabel>
                  <Input
                    type={show ? "text" : "password"}
                    name="password2"
                    onChange={changeHandler}
                    minLength={8}
                  />
                </FormControl>

                <Switch
                  colorScheme="orange"
                  onChange={() => setShow((show) => !show)}
                >
                  Show password
                </Switch>
              </Stack>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Sign up
                </Button>
              </Stack>
            </form>

            <Text as="span" textAlign="center" pt={2}>
              Already have an account?
              <Link
                as={ReactLink}
                to="/signin"
                px={1}
              >
                Sign in
              </Link>
              instead.
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
