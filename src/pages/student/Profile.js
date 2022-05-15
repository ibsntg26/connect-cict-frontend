import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Container,
  Grid,
  GridItem,
  Center,
  SimpleGrid,
  Heading,
  Box,
  Stack,
  HStack,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import StudentLayout from "../../components/student/StudentLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";
import { Image } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [studentInfo, setStudentInfo] = useState("");
  const api = useAxios();

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/student/${user.user_id}/student_profile/`
    );
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Profile";
    
    getUserProfile()
      .then((res) => {
        let student = res;
        let account = res.account;
        delete student.account;
        setStudentInfo(student);
        setUserInfo(account);
        // console.log(studentInfo);
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

  return(
    <StudentLayout>
           {userInfo.first_name}
    {userInfo.last_name}
    {studentInfo.student_id}
      <Stack m={5} spacing={5}>
        <Box
          bg="white"
          borderRadius="10px"
          box-shadow="md"
          padding={10}
          lineHeight={1.25}
          height="110vh"
        >
    <SimpleGrid minChildWidth="300px" spacing={5} lineHeight={1.25} paddingBottom={40} >
      <Box bg="#EDF2F7" borderRadius="10px" box-shadow="md"  padding={10}>
        <Flex justifyContent="center">
          <Image
            borderRadius='full'
            boxSize='400px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
        />
        </Flex>
        <Flex justifyContent="center">
        <Stack direction={['row']}spacing='100px'>
              <Box ><Button colorScheme='yellow'>Update<br></br>Details</Button></Box>
              <Box ><Button colorScheme='yellow'>Change<br></br>Password</Button></Box>
              </Stack>
              </Flex>

      </Box>
      <Box bg="#EDF2F7" borderRadius="10px" box-shadow="md"  padding={10}>
               <SimpleGrid columns={2} spacingX='40px' spacingY='20px' >
                <Text as='b'>First Name</Text>
                <FormControl id="firstName">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Last Name</Text>
                <FormControl id="lastname">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Middle Name</Text>
                <FormControl id="middlename">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Year Level</Text>
                <FormControl id="yearlevel">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Section</Text>
                <FormControl id="section">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Student Number</Text>
                <FormControl id="studnum">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Email Adress</Text>
                <FormControl id="emailadd">
                  <FormLabel>N/A</FormLabel>
                </FormControl>

                <Text as='b'>Home Adress</Text>
                <FormControl id="homeadd">
                  <FormLabel>N/A</FormLabel>
                </FormControl>
               </SimpleGrid>
               
      </Box>
      
    </SimpleGrid>
    
    <hr></hr>
      </Box>
       </Stack>   
    </StudentLayout> 
  );
};

export default Profile;
