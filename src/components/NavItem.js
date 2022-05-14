import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

export default function NavItem({ icon, title, click, link, active, navSize }) {
  const navigate = useNavigate();

  return (
    <Flex
      mt={3}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
      onClick={
        link
          ? () => {
              navigate(link);
            }
          : click
      }
    >
      <Menu placement="right">
        <Link
          backgroundColor={active && "gray.200"}
          color={active && "gray.800"}
          p={2}
          borderRadius={8}
          _hover={{
            textDecor: "none",
            backgroundColor: "gray.200",
            color: "gray.800",
          }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="2xl"
                // xl
                color={active ? "gray.800" : "gray.500"}
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
