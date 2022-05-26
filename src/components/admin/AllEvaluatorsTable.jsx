import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Avatar,
  Flex,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";

export default function AllEvaluatorsTable({ evaluatorsData }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Email</Th>
            <Th>Last login</Th>
          </Tr>
        </Thead>
        <Tbody>
          {evaluatorsData.length > 0 ? (
            evaluatorsData.map((evaluator) => (
              <Tr
                key={evaluator.employee_id}
                _hover={{
                  backgroundColor: "gray.100",
                }}
              >
                <Td py={3}>
                  <Flex>
                    <Avatar
                      name={evaluator.account.first_name}
                      src={evaluator.account.profile_picture}
                      me={2}
                    />
                    <Flex flexDir="column" justify="center">
                      <Text fontWeight={600}>
                        {`${evaluator.account.first_name} ${evaluator.account.last_name}`}
                      </Text>
                      <Text fontSize="xs">
                        Employee #{evaluator.employee_id}
                      </Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>{evaluator.account.email}</Td>
                <Td>
                  {evaluator.account.last_login
                    ? dayjs(evaluator.account.last_login).format(
                        "D MMMM YYYY h:mm A"
                      )
                    : "Never"}
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} textAlign="center">
                No evaluators found.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
