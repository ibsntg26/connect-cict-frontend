import React, { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import AuthFormContainer from "../components/AuthFormContainer";

const UserPasswordReset = () => {
  useEffect(() => {
    document.title = "CONNECT | Password Reset";
  }, []);

  return (
    <AuthFormContainer headingText="Reset your account password">
      <Box
        rounded="lg"
        bg="white"
        boxShadow="lg"
        width={{ base: 350, md: 400 }}
        p={8}
      >
        <Stack spacing={4}>
          <Stack
            as="form"
            onSubmit={() => {
              alert("submit");
            }}
          >
            <FormControl id="email" mb={8}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
              <FormHelperText>
                Enter you e-mail address and we'll send you a link to reset your
                password.
              </FormHelperText>
            </FormControl>
            <Button type="submit">Send email</Button>
          </Stack>

          <Text as="span" textAlign="center">
            <Link as={ReactLink} to="/signin">
              Back to sign in
            </Link>
          </Text>
        </Stack>
      </Box>
      <Box h={100} />
    </AuthFormContainer>
  );
};

export default UserPasswordReset;
