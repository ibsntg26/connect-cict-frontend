import React, { useState, useContext, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Alert, AlertIcon, Box, Button, Checkbox, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Stack, Text, } from "@chakra-ui/react";
import AuthFormContainer from "../components/AuthFormContainer";

import AuthContext from "../context/auth-context";

const UserSignin = () => {
  const { loginUser, error, setError } = useContext(AuthContext);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoginAttempts(loginAttempts + 1);

    if (loginAttempts === 3) {
      e.target.reset();
      setError("You have reached maximum attempts for logging in.");
    } else {
      loginUser(e);
    }

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  useEffect(() => {
    document.title = "CONNECT | Sign In";
  }, []);

  return (
    <AuthFormContainer headingText="Sign in to your account">
      <Box
        rounded="lg"
        bg="white"
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
          <Stack as="form" onSubmit={submitHandler}>
            <FormControl id="email" mb={2}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" disabled={loginAttempts === 4} />
            </FormControl>
            <FormControl id="password" mb={2}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? "text" : "password"}
                  disabled={loginAttempts === 4}
                />
                <InputRightElement width="3rem">
                  <Button
                    onClick={() => setShow((show) => !show)}
                    variant="ghost"
                    color="gray.700"
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
                <Link as={ReactLink} to="/password-reset">
                  Forgot password?
                </Link>
              </Stack>
              <Button type="submit" disabled={loginAttempts === 4}>
                Sign in
              </Button>
            </Stack>
          </Stack>
          
          <Text as="span" textAlign="center" pt={2}>
            Don't have an account?
            <Link as={ReactLink} to="/signup" ps={1}>
              Sign up
            </Link>
          </Text>
        </Stack>
      </Box>
    </AuthFormContainer>
  );
};

export default UserSignin;
