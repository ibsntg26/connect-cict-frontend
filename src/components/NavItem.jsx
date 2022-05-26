import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";

export default function NavItem(props) {
  const navigate = useNavigate();

  return (
    <Flex
      mt={3}
      flexDir="column"
      w="100%"
      alignItems={props.navSize === "small" ? "center" : "flex-start"}
      onClick={
        props.link
          ? () => {
              navigate(props.link);
            }
          : props.click
      }
    >
      <Menu placement="right">
        <Tooltip
          hasArrow
          label={props.navSize === "small" ? props.title : null}
          placement="right"
          bgColor="gray.500"
          zIndex={9999}
        >
          <Link
            backgroundColor={props.active && "gray.200"}
            color={props.active && "gray.800"}
            p={2}
            borderRadius={8}
            _hover={{
              textDecor: "none",
              backgroundColor: "gray.700",
              color: "gray.800",
            }}
            w={props.navSize === "large" && "100%"}
          >
            <MenuButton w="100%">
              <Flex>
                <Icon
                  as={props.icon}
                  fontSize="2xl"
                  // xl
                  color={props.active ? "gray.800" : "gray.500"}
                />
                <Text
                  ml={5}
                  color="white"
                  display={props.navSize === "small" ? "none" : "flex"}
                >
                  {props.title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </Tooltip>
      </Menu>
    </Flex>
  );
}
