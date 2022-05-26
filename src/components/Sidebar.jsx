import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMenuSharp, IoLogOutSharp } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Button, Divider, Flex, Icon, IconButton, Image, Modal, ModalBody, ModalContent, ModalCloseButton, ModalFooter, ModalHeader, ModalOverlay, Text, Tooltip, useDisclosure, } from "@chakra-ui/react";
import NavItem from "./NavItem";

import AuthContext from "../context/auth-context";
import LayoutContext from "../context/layout-context";

export default function Sidebar(props) {
  const {
    siteLogoXS,
    navSize,
    changeNavSize,
    changeSidebarWidth,
  } = useContext(LayoutContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logoutUser } = useContext(AuthContext);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to logout?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              No
            </Button>
            <Button variant="ghost" color="orange.400" onClick={logoutUser}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex
        pos="fixed"
        h="100vh"
        zIndex={999}
        boxShadow="3px 0 40px -10px rgba(0,0,0,0.75)"
        w={navSize === "small" ? "10vh" : "30vh"}
        borderRightRadius={navSize === "small" ? "10px" : "5px"}
        flexDir="column"
        bg={"gray.900"}
        color={"gray.50"}
        justifyContent="space-between"
        transition="width 0.15s ease-in-out"
      >
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          as="nav"
        >
          <Flex>
            <IconButton
              background="none"
              mt={4}
              fontSize={"2xl"}
              _hover={{ background: "none" }}
              icon={<IoMenuSharp />}
              onClick={() => {
                if (navSize === "small") {
                  changeNavSize("large");
                  changeSidebarWidth("30vh");
                } else {
                  changeNavSize("small");
                  changeSidebarWidth("10vh");
                }
              }}
            />
            <Tooltip
              hasArrow
              label="CONNECT: CICT Registrar Help Center"
              placement="right"
              bgColor="gray.500"
              zIndex={9999}
            >
              <Link to="/dashboard">
                <Image
                  src={siteLogoXS}
                  maxH={6}
                  mt={6}
                  ml={1}
                  display={navSize === "small" ? "none" : "flex"}
                />
              </Link>
            </Tooltip>
          </Flex>
          <Divider
            mt={3}
            mb={2}
            display={navSize === "small" ? "none" : "flex"}
          />

          {props.children}

          <NavItem
            navSize={navSize}
            icon={IoLogOutSharp}
            click={onOpen}
            title="Logout"
          />
        </Flex>

        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          mb={2}
        >
          <Divider display={navSize === "small" ? "none" : "flex"} />
          <Link to="../help-center/">
            <Flex mt={4} align="center">
              {/* <Avatar size="sm" src="avatar-1.jpg" /> */}
              <Icon
                as={BsFillQuestionCircleFill}
                fontSize="2xl"
                ml={navSize === "small" ? 0 : 2}
                color="gray.500"
              />
              <Flex
                flexDir="column"
                ml={4}
                display={navSize === "small" ? "none" : "flex"}
              >
                <Text as="b" color="white">
                  Help Center
                </Text>
              </Flex>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
