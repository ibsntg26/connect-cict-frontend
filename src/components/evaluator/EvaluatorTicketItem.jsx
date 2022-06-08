import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge, Flex, Link, Menu, MenuButton, Text, Tooltip, } from "@chakra-ui/react";

export default function EvaluatorTicketItem(props) {
  const navigate = useNavigate();

  return (
    <Tooltip
      hasArrow
      label={props.label.length > 25 && props.label}
      placement="right"
      bgColor="gray.500"
    >
      <Flex
        mt={3}
        flexDir="column"
        w="100%"
        alignItems="flex-start"
        backgroundColor={
          window.location.href.indexOf("/" + props.id) > -1 && "gray.200"
        }
        borderRadius="10px"
        onClick={
          props.id
            ? () => {
                if (window.location.href.indexOf("/admin/tickets") > -1)
                  navigate(`/admin/t%C3%ADckets/${props.id}`);
                else if (
                  window.location.href.indexOf("/admin/t%C3%ADckets") > -1
                )
                  navigate(`/admin/tickets/${props.id}`);
                else {
                  window.location.href.indexOf("tickets") > -1
                  ? navigate(`/t%C3%ADckets/${props.id}`)
                  : navigate(`/tickets/${props.id}`);
                }
                
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
                <Flex align="center" justify="center" me={3}>
                  <Avatar name={props.name} src={props.pic} />
                </Flex>
                <Flex direction="column" textAlign="start">
                  <Text fontWeight={700} noOfLines={1}>
                    Ticket #{props.id} - {props.label}
                  </Text>
                  <Text fontSize="14px">Reported by {props.name}</Text>
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
