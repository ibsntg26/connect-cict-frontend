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
  Badge
} from "@chakra-ui/react";

export default function StudentTicket({
  id,
  click,
  label,
  pic,
  name,
  date_created,
  date_updated,
  status,
}) {
  const navigate = useNavigate();

  return (
    <Flex
      mt={3}
      flexDir="column"
      w="100%"
      alignItems="flex-start"
      backgroundColor={window.location.href.indexOf(id)>-1 && "gray.200"}
      borderRadius="10px"
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
            borderRadius: "10px",
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
                  {dayjs(date_created).diff(dayjs(date_updated)) === 0 ? `Reported on ${dayjs(date_created).format("MMMM D, YYYY")}` : `Updated on ${dayjs(date_updated).format("MMMM D, YYYY")}`}
                </Text>
                <Text>
                  <Badge colorScheme={status === 'closed' ? 'red' : 'green' }>{status}</Badge>
                </Text>
              </Flex>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
