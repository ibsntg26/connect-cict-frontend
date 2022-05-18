import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import UserLayout from "../../components/UserLayout";

import { 
  Box, 
  SimpleGrid,
  Text,
  GridItem,
  Grid,
  HStack,
Flex, } 
  from "@chakra-ui/react"

import { FaUserEdit } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";

const AdminDashboard = () => {
  return (
    <UserLayout>
      <Flex>
        <Box p='3' h='1000'>
          <Box h='200'>
        <Grid templateRows='repeat(2, 1fr)'
            templateColumns='repeat(5, 1fr)'>
          <Grid
            m={2}
            pl={10}
            pt={10}
            h={170}
            w={950}
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap={6}
            color='blackFont'
            textAlign='left'
            boxShadow='md' p='6' rounded='md' bg='white'
          >
            <GridItem w={205} bg='white' colSpan={1} 
            borderRadius='lg'
            boxShadow='lg'>
              <Text pl={6} pt={6} fontWeight={400} fontSize='sm' >CURRENT</Text>
              <Text pl={6} pt={2} pb={5} fontWeight='bold'fontSize='3xl' color='primaryAccent'>5</Text>
            </GridItem>

            <GridItem w={205} bg='white' colSpan={1}
            borderRadius='lg'
            boxShadow='lg'>
              <Text pl={6} pt={6} fontWeight={400} fontSize='sm'>PROCESS</Text>
              <Text pl={6} pt={2} pb={5} fontWeight='bold' fontSize='3xl' color='primaryAccent'>0</Text>
            </GridItem>

            <GridItem w={205} bg='white' colSpan={1}
            borderRadius='lg'
            boxShadow='lg'>
              <Text pl={6} pt={6} fontWeight={400} fontSize='sm'>RESOLVE</Text>
              <Text pl={6} pt={2} pb={5} fontWeight='bold' fontSize='3xl' color='primaryAccent'>31</Text>
            </GridItem>

            <GridItem w={205} bg='white' colSpan={1}
            borderRadius='lg'
            boxShadow='lg'>
              <Text pl={6} pt={6} fontWeight={400} fontSize='sm'>TOTAL USERS</Text>
              <Text pl={6} pt={2} pb={5} fontWeight='bold' fontSize='3xl' color='primaryAccent'>34</Text>
            </GridItem>
        </Grid>
        <Box boxShadow='md' p='6' rounded='md' bg='white' w={250} h={680} mt={2} ml={2}>
            STUDENT ACTIVITY 
            <Box mt='5'>
              <HStack>
                  <FaUserEdit />
                  <Box>
                    <Text fontSize='13' fontWeight='bold'>Unarchived team - Team Three</Text>
                    <Text fontSize='11'>2022-02-08</Text>
                  </Box>
              </HStack>
            </Box>
            <Box mt='5'>
              <HStack>
                  <BsFillPersonPlusFill color='orange'/>
                  <Box>
                    <Text fontSize='13' fontWeight='bold'>Unarchived team - Team Three</Text>
                    <Text fontSize='11'>2022-02-08</Text>
                  </Box>
              </HStack>
            </Box>
            <Box mt='5'>
              <HStack>
                  <FaUserEdit />
                  <Box>
                    <Text fontSize='13' fontWeight='bold'>Unarchived team - Team Three</Text>
                    <Text fontSize='11'>2022-02-08</Text>
                  </Box>
              </HStack>
            </Box>
        </Box>
        </Grid>
        </Box>
        <Box boxShadow='md' p='6' rounded='md' bg='white' w={950} h={130} mt={0} ml={2}>
            <Text>ADMIN LOG</Text>
            <Box>
              
            </Box>
        </Box>
        <HStack direction={['column', 'row']} spacing='24px' mt='5' ml='3'>
          <Box w='300px' h='440px' bg='white' borderRadius='lg'boxShadow='lg' pl={5} pt={5}>
            <Text>TIMESHEETS REPORT</Text>
          </Box>
          <Box w='300px' h='440px' bg='white' borderRadius='lg'boxShadow='lg' pl={5} pt={5}>
            <Text>COMPLETED TASKS</Text>
            <Box mt='5'>
                <Text mt='5' fontWeight='bold' >Determine The Software Development Methodology</Text>
                <Text>assigned by: Eunice Custodio</Text>
                <Text>completed 4 months, 1 week ago</Text>
            </Box>
            <Box mt='5'>
                <Text mt='5' fontWeight='bold' >Determine The Software Development Methodology</Text>
                <Text>assigned by: Eunice Custodio</Text>
                <Text>completed 4 months, 1 week ago</Text>
            </Box>
          </Box>
          <Box w='300px' h='440px' bg='white' borderRadius='lg'boxShadow='lg' pl={5} pt={5}>
            <Text>ONGOING TASKS</Text>
          </Box>
      </HStack>
    </Box>
    </Flex>
    </UserLayout>
  )
}

export default AdminDashboard