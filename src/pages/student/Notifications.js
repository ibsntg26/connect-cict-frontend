import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Flex,
  Center,
  SimpleGrid,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Image,
  HStack,
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Notifications = () => {
  return (
    <UserLayout>
       <Stack m={5} spacing={5}>
     <Flex as="b" fontSize="3xl" paddingTop={10} >Notifications</Flex>

<SimpleGrid spacingY="10px">    
 <Box  borderLeftWidth="3px" borderColor="skyblue" boxShadow='sm' h="15vh" w="90vw" p='6'  rounded='md' bg='white'>
  <Center justifyContent="left">
    <Image
      borderRadius='full'
      boxSize='80px'
      src='https://bit.ly/dan-abramov'
      alt='Dan Abramov'
    />
    <SimpleGrid paddingLeft="20px" >
      <HStack>
        <FormLabel fontWeight="bold" fontSize="lg">John Doe {/* {userInfo.username} */}</FormLabel>
        <FormLabel paddingBottom="10px"fontSize="md">reacted to your post {/* {userInfo.username} */}</FormLabel>
      </HStack>
         
      <FormControl>
         <FormLabel color="gray.600" fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{/* {userInfo.info} */}</FormLabel>
         <FormLabel fontSize="sm">10 mins ago{/* {userInfo.time} */}</FormLabel>
      </FormControl>
    </SimpleGrid>
   </Center>
  </Box>
 
  <Box  borderLeftWidth="3px" borderColor="skyblue" boxShadow='sm' h="15vh" w="90vw" p='6'  rounded='md' bg='white'>
  <Center justifyContent="left">
    <Image
      borderRadius='full'
      boxSize='80px'
      src='https://bit.ly/dan-abramov'
      alt='Dan Abramov'
    />
    <SimpleGrid paddingLeft="20px" >
      <HStack>
        <FormLabel fontWeight="bold" fontSize="lg">John Doe {/* {userInfo.username} */}</FormLabel>
        <FormLabel paddingBottom="10px"fontSize="md">reacted to your post {/* {userInfo.username} */}</FormLabel>
      </HStack>
         
      <FormControl>
         <FormLabel color="gray.600" fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{/* {userInfo.info} */}</FormLabel>
         <FormLabel fontSize="sm">10 mins ago{/* {userInfo.time} */}</FormLabel>
      </FormControl>
    </SimpleGrid>
   </Center>
  </Box>

    <Box  borderLeftWidth="3px" borderColor="skyblue" boxShadow='sm' h="15vh" w="90vw" p='6'  rounded='md' bg='white'>
  <Center justifyContent="left">
    <Image
      borderRadius='full'
      boxSize='80px'
      src='https://bit.ly/dan-abramov'
      alt='Dan Abramov'
    />
    <SimpleGrid paddingLeft="20px" >
      <HStack>
        <FormLabel fontWeight="bold" fontSize="lg">John Doe {/* {userInfo.username} */}</FormLabel>
        <FormLabel paddingBottom="10px"fontSize="md">reacted to your post {/* {userInfo.username} */}</FormLabel>
      </HStack>
         
      <FormControl>
         <FormLabel color="gray.600" fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{/* {userInfo.info} */}</FormLabel>
         <FormLabel fontSize="sm">10 mins ago{/* {userInfo.time} */}</FormLabel>
      </FormControl>
    </SimpleGrid>
   </Center>
  </Box>

   <Box  borderLeftWidth="3px" borderColor="skyblue" boxShadow='sm' h="15vh" w="90vw" p='6'  rounded='md' bg='white'>
  <Center justifyContent="left">
    <Image
      borderRadius='full'
      boxSize='80px'
      src='https://bit.ly/dan-abramov'
      alt='Dan Abramov'
    />
    <SimpleGrid paddingLeft="20px" >
      <HStack>
        <FormLabel fontWeight="bold" fontSize="lg">John Doe {/* {userInfo.username} */}</FormLabel>
        <FormLabel paddingBottom="10px"fontSize="md">reacted to your post {/* {userInfo.username} */}</FormLabel>
      </HStack>
         
      <FormControl>
         <FormLabel color="gray.600" fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{/* {userInfo.info} */}</FormLabel>
         <FormLabel fontSize="sm">10 mins ago{/* {userInfo.time} */}</FormLabel>
      </FormControl>
    </SimpleGrid>
   </Center>
  </Box>

   <Box  borderLeftWidth="3px" borderColor="skyblue" boxShadow='sm' h="15vh" w="90vw" p='6'  rounded='md' bg='white'>
  <Center justifyContent="left">
    <Image
      borderRadius='full'
      boxSize='80px'
      src='https://bit.ly/dan-abramov'
      alt='Dan Abramov'
    />
    <SimpleGrid paddingLeft="20px" >
      <HStack>
        <FormLabel fontWeight="bold" fontSize="lg">John Doe {/* {userInfo.username} */}</FormLabel>
        <FormLabel paddingBottom="10px"fontSize="md">reacted to your post {/* {userInfo.username} */}</FormLabel>
      </HStack>
         
      <FormControl>
         <FormLabel color="gray.600" fontSize="md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{/* {userInfo.info} */}</FormLabel>
         <FormLabel fontSize="sm">10 mins ago{/* {userInfo.time} */}</FormLabel>
      </FormControl>
    </SimpleGrid>
   </Center>
  </Box>

</SimpleGrid>
   </Stack>
     </UserLayout>
  )
}

export default Notifications