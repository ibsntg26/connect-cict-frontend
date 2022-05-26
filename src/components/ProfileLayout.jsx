import { Flex, Heading, Stack } from "@chakra-ui/react";
import UserLayout from "./UserLayout";

export default function ProfileLayout({ children }) {
  return (
    <UserLayout>
      <Flex justify="center" overflow="auto">
        <Stack w={{ base: "full", md: "35vw" }} m={2} spacing={5}>
          <Heading size="md">Profile</Heading>
          <Flex
            bg="white"
            borderRadius="10px"
            justifyContent="center"
            boxShadow="md"
            p={5}
          >
            <Flex flexDir="column">{children}</Flex>
          </Flex>
        </Stack>
      </Flex>
    </UserLayout>
  );
}
