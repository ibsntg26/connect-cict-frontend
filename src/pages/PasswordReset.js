import React, { useState, useContext, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Flex, Box, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Checkbox, Stack, Link, Button, Heading, Text, Alert, AlertIcon, } from "@chakra-ui/react";

import AuthContext from "../context/auth-context";
import LayoutContext from "../context/layout-context";

const PasswordReset = () => {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.100">
      <Stack spacing={6} mx="auto" maxW="lg" py={12} px={6}>
        {/* Header */}
        <Stack align="center">
          {/* <Image src={siteLogoMD} maxW="200px" mb={2} /> */}
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot Password
          </Heading>
        </Stack>

        {/* Form */}
        <Box
          rounded="lg"
          bg="white"
          boxShadow="lg"
          width={{ base: 350, md: 400 }}
          p={8}
        >
          <Stack spacing={4}>
            <form>
              <FormControl id="email" mb={2}>
                <FormLabel>Enter you e-mail address and we'll send you a link to reset your password.</FormLabel>
                <Input type="email" placeholder='E-mail Address' mt='5' mb='5' />
              </FormControl>
              
              <Stack spacing={10}>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default PasswordReset