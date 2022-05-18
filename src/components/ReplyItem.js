import React from "react";
import dayjs from "dayjs";

import { Avatar, Box, Flex, Image, Tag, Text } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function ReplyItem({
  message,
  attachment,
  userFlag,
  date,
  resolutionFlag,
}) {
  return (
    <Flex
      mb={6}
      justifyContent={userFlag && "end"}
      direction={userFlag && "row-reverse"}
    >
      <Flex direction="column">
        <Text ms={2} fontSize="small" color="gray.400">
          {dayjs(date).format("MM/D h:mm a")}
        </Text>
        <Flex
          padding={2}
          borderRadius="20px"
          bgColor={userFlag ? "gray.500" : "orange.500"}
          // justify="center"
          flexDir="column"
          align={userFlag && "end"}
        >
          <Text color="white" fontSize="14px">
            {message}
          </Text>
          {attachment && (
            <Image src={attachment} w={300} mt={2} borderRadius="20px" alt="reply attachment" />
          )}
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
