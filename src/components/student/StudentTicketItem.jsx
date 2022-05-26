import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Badge, Flex, Link, Menu, MenuButton, Text, Tooltip, } from "@chakra-ui/react";

export default function StudentTicketItem(props) {
  const navigate = useNavigate();

  return (
    <Tooltip
      hasArrow
      label={props.label.length > 20 && (props.label)}
      placement="right"
      bgColor="gray.500"
    >
      <Flex
        mt={3}
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        backgroundColor={
          window.location.href.indexOf('/' + props.id) > -1 && "gray.200"
        }
        borderRadius="10px"
        onClick={
          props.id
            ? () => {
                window.location.href.indexOf("tickets") > -1
                  ? navigate(`/t%C3%ADckets/${props.id}`)
                  : navigate(`/tickets/${props.id}`);
                // window.location.replace(`/tickets/${id}`);
              }
            : props.click
        }
      >
        <Menu placement="right">
          <Link
            color={"gray.800"}
            p={2}
            _hover={{
              textDecor: "none",
              backgroundColor: "gray.100",
              color: "gray.800",
              borderRadius: "10px",
            }}
            w={"100%"}
          >
            <MenuButton w="100%">
              <Flex>
                {/* <Flex align="center" justify="center" me={3}>
                  <Avatar name={props.name} src={props.pic} />
                </Flex> */}
                <Flex direction="column" textAlign="start">
                  <Text as="b" noOfLines={1}>
                    Ticket #{props.id} - {props.label}
                  </Text>
                  <Text as="i" fontSize="small" mb={1}>
                    {props.status === "open" &&
                      "Reported on" +
                        " " +
                        dayjs(props.date_created).format("MMMM D, YYYY")}
                    {props.status === "processing" &&
                      "Updated on" +
                        " " +
                        dayjs(props.date_updated).format("MMMM D, YYYY")}
                    {props.status === "closed" &&
                      "Closed on" +
                        " " +
                        dayjs(props.date_updated).format("MMMM D, YYYY")}
                  </Text>
                  <Text>
                    <Badge
                      colorScheme={props.status === "closed" ? "red" : "green"}
                    >
                      {props.status}
                    </Badge>
                  </Text>
                </Flex>
              </Flex>
            </MenuButton>
          </Link>
        </Menu>
      </Flex>
    </Tooltip>
  );
}