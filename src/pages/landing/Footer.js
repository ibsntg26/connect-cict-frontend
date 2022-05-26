import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

import { Link } from "react-router-dom";

import cictlogo from "./assets/logo-full.png";

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue("#20283a", "white")}
      color={useColorModeValue("white", "white")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text color="white">© 2022 CICT CONNECT. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <Link to="/admin/signin">
            <img src={cictlogo} width={150} height={0} />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
