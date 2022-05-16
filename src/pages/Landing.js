import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Icon,
  IconProps,
} from "@chakra-ui/react";

const Landing = () => {
  return (
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Basta heading <br />
            <Text as={"span"} color={"orange.400"}>
              CONNECT CICT
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"orange"}
              bg={"orange.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "orange.500",
              }}
            >
              Get Started
            </Button>
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button>
            <Box>
              <Text
                fontSize={"lg"}
                fontFamily={"Caveat"}
                position={"absolute"}
                right={"-125px"}
                top={"-15px"}
                transform={"rotate(10deg)"}
              >
                Starting at $15/mo
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
  );
};

export default Landing;
