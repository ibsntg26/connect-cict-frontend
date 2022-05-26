import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import img1 from "./assets/bg.jpg";
import img2 from "./assets/logo-full.png";
import "./assets/logo.css";

export default function Top() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <img className="rcorners1" src={img2} width="250" height="250" />
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                zIndex: -1,
              }}
            >
              Incident Report System
            </Text>
            <br />{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            An exploration beyond addressing issues and connecting everyone. A
            hassle free and friendly ticketing system.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <NavLink to="/signin">
              <Button rounded={"full"} px={5}>Sign In</Button>
            </NavLink>

            <NavLink to="/signup">
              <Button
                rounded={"full"}
                bg={"orange.400"}
                color={"white"}
              >
                Sign Up
              </Button>
            </NavLink>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={img1} />
      </Flex>
    </Stack>
  );
}
