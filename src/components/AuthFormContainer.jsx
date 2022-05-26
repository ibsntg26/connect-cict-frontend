import React, { useContext } from "react";
import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";

import LayoutContext from "../context/layout-context";

export default function AuthFormContainer(props) {
  const { siteLogoMD, sitePublicBg } = useContext(LayoutContext);

  return (
    // <Flex minH="100vh" align="center" justify="center" bg="gray.100">
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.100"
      backgroundImage={sitePublicBg}
      backgroundAttachment="fixed"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <Stack spacing={6} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Image src={siteLogoMD} maxW="200px" mb={2} />
          <Heading
            as={motion.div}
            color="gray.700"
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign="center"
            initial={{ scale: 0.25 }}
            animate={{ scale: 1 }}
            transition="0.25s ease-out"
          >
            {props.headingText}
          </Heading>
        </Stack>

        {/* Form */}
        <Box
          as={motion.div}
          initial={{ scale: 0.25 }}
          animate={{ scale: 1 }}
          transition="0.25s ease-out"
        >
          {props.children}
        </Box>
      </Stack>
    </Flex>
  );
}
