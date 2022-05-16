import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Text,
  Avatar,
  Link,
  Menu,
  MenuButton,
  VStack,
} from "@chakra-ui/react";

export default function TicketItem({ id, click, label, pic, name }) {
  const navigate = useNavigate();

  return (
    <Flex
      mt={3}
      flexDir="column"
      w="100%"
      alignItems="flex-start"
      onClick={
        id
          ? () => {
              navigate(id);
            }
          : click
      }
    >
      <Menu placement="right">
        <Link
          color={"gray.800"}
          p={2}
          _hover={{
            textDecor: "none",
            backgroundColor: "gray.200",
            color: "gray.800",
          }}
          w={"100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Flex align="center" justify="center" me={3}>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              </Flex>
              <Flex direction="column">
                <Text>{label}</Text>
                <Text>{label}</Text>
                <Text>{label}</Text>
              </Flex>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
