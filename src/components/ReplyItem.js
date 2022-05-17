import React from "react";
import { Avatar, Box, Flex, Tag, Text } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function ReplyItem({
  message,
  attachment,
  userFlag,
  pic,
  resolutionFlag,
}) {
  return (
    <Flex
      mb={6}
      justifyContent={userFlag && "end"}
      direction={userFlag && "row-reverse"}
    >
      <Flex direction="column">
        <Flex
          padding={2}
          borderRadius="20px"
          bgColor={userFlag ? "gray.500" : "orange.500"}
          justify="center"
          align="center"
        >
          <Text color="white" fontSize="14px">
            {message}
          </Text>
        </Flex>

        {resolutionFlag && (
          <Flex align="center" justify="center">
            <Text me={1} color="green.500">
            <BsFillCheckCircleFill />
            </Text>
            <Text color="green.500">Solution</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
