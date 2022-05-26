import React from "react";
import dayjs from "dayjs";

import { Flex, Image, Text } from "@chakra-ui/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function ReplyItem(props) {
  return (
    <Flex
      mb={6}
      justifyContent={props.userFlag && "end"}
      direction={props.userFlag && "row-reverse"}
    >
      <Flex direction="column">
        <Text ms={2} me={props.userFlag && 2} textAlign={props.userFlag && "end"} fontSize="small" color="gray.400">
          {dayjs(props.date).format("MM/D h:mm a")}
        </Text>
        <Flex
          padding={2}
          borderRadius="10px"
          bgColor={props.userFlag ? "orange.400" : "gray.500"}
          // justify="center"
          flexDir="column"
          align={props.userFlag && "end"}
        >
          <Text color="white">
            {props.message}
          </Text>
          {props.attachment && (
            <Image src={props.attachment} w={350} mt={2} borderRadius="10px" alt="reply attachment" />
          )}
        </Flex>
        {props.resolutionFlag && (
          <Flex align="center" justify={props.userFlag && "end"}>
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
