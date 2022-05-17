import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Text,
  Avatar,
  Link,
  Menu,
  MenuButton,
  Tag,
  TagLabel,
} from "@chakra-ui/react";

export default function StudentTicket({
  id,
  click,
  label,
  pic,
  name,
  date,
  status,
}) {
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
            window.location.href.indexOf("tickets")>-1 ? navigate(`/t%C3%ADckets/${id}`) : navigate(`/tickets/${id}`)
              // window.location.replace(`/tickets/${id}`);
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
                <Avatar name={name} src={pic} />
              </Flex>
              <Flex direction="column" textAlign="start">
                <Text as="b" noOfLines={1}>
                  #{id} - {label}
                </Text>
                <Text as="i" fontSize="small" mb={1}>
                  Reported on {dayjs(date).format("MMMM D, YYYY")}
                </Text>
                <Text>
                  <Tag colorScheme="orange" borderRadius="full">
                    <TagLabel textTransform="capitalize">{status}</TagLabel>
                  </Tag>
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
