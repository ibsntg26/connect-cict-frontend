import React, { useState, useContext, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Flex, Box, FormControl, FormLabel, Image, Input, 
    InputGroup, InputRightElement, Checkbox, Stack, VStack, Link, 
    Button, Heading, Text, Alert, AlertIcon, Table,
    Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
    InputLeftElement,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Spacer,} from "@chakra-ui/react";

import MockData from './MOCK_DATA.json'
import { BiSearch, BiUserCircle, BiEdit, BiPauseCircle} from "react-icons/bi";
import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs';
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from 'react-icons/ri';

export const UsersPage = () => {
    const [data, setdata] = useState(MockData)
  return (
    <Box border='1px' borderColor='gray.200'>
        <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"} m="10">
            <Heading>Evaluators</Heading>
            <Button>Add Evaluator</Button>
        </Stack>
        <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"} m="10">
            <Box>
                <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                    <Input type="text" size="20" w="10" pl="2" placeholder="10" />
                    <Text>entries</Text>
                </Stack>
            </Box>
            <Input pl="3" type="search" placeholder='Search' size="20" w="50"/>
        </Stack>
        <Box mb={10}>
        <TableContainer boxShadow='md' color='#000000' borderColor='gray.200'>
          <Table variant='simple'>
            <Thead bg='gray.200'>
              <Tr>
                <Th color='#000000'>Section</Th>
                <Th color='#000000'>Project Coordinator</Th>
                <Th color='#000000'>Total Students</Th>
                <Th color='#000000'>Total Teams</Th>
                <Th color='#000000'>Academic Year</Th>
                <Th color='#000000'>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((d) =>(
                        <Tr key={d.id}>
                            <Td>{d.Section}</Td>
                            <Td>{d.Name}</Td>
                            <Td>{d.Total}</Td>
                            <Td>{d.Teams}</Td>
                            <Td>{d.dateTime}</Td>
                            <Td>
                            <Flex justifyContent="center">
                              <Popover placement="bottom">
                                <PopoverTrigger>
                                  <IconButton
                                    icon={<BsThreeDotsVertical />}
                                    variant='outline'
                                    borderColor="white"
                                    w="fit-content"
                                  />
                                </PopoverTrigger>
                                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                                  <PopoverArrow />
                                  <PopoverBody>
                                    <Stack>
                                      <Button
                                        w="194px"
                                        variant="ghost"
                                        rightIcon={<BiEdit />}
                                        justifyContent="space-between"
                                        fontWeight="normal"
                                        fontSize="sm">
                                        Edit
                                      </Button>
                                    </Stack>
                                  </PopoverBody>
                                </PopoverContent>
                              </Popover>
                            </Flex>
                            </Td>
                        </Tr>
                    ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td><Text>Result: 4</Text></Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
        </Box>

    </Box>
  )
}
export default UsersPage
