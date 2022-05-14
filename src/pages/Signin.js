import React, { useState, useContext, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
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
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";

import AuthContext from "../context/auth-context";
import LayoutContext from "../context/layout-context";

const Signin = () => {
  const { loginUser, error, setError } = useContext(AuthContext);
  const { siteLogoMD } = useContext(LayoutContext);
  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(e);
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  useEffect(() => {
    document.title = "CONNECT | Sign In";
  });

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={6}
        mx="auto"
        maxW="lg"
        color="gray.700"
        py={12}
        px={6}
      >
        {/* Header */}
        <Stack align="center">
          <Image src={siteLogoMD} maxW="200px" mb={2} />
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Sign in to your account
          </Heading>
        </Stack>

        {/* Form */}
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          width={{ base: 350, md: 400 }}
          p={8}
        >
          {error && (
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
          )}
          <Stack spacing={4}>
            <form onSubmit={submitHandler}>
              <FormControl id="email" mb={2}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password" mb={2}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input type={show ? "text" : "password"} />
                  <InputRightElement width="3rem">
                    <Button
                      onClick={() =>
                        setShow((show) => !show)
                      }
                      variant="ghost"
                      _hover={{
                        color: "gray.600",
                      }}
                    >
                      {show ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox colorScheme="orange">Remember me</Checkbox>
                  <Link color={"orange.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.500",
                  }}
                  type={"submit"}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
            <Text as="span" textAlign="center" pt={2}>
              Don't have an account?
              <Link as={ReactLink} to="/signup" color={"orange.400"} ps={1}>
                Sign up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signin;
