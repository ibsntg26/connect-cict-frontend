import React, { useContext, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Tooltip } from '@chakra-ui/react'

import {
  Flex,
  SimpleGrid,
  Box,
  Stack,
  Text,
  FormControl,
    InputGroup,
  InputRightElement,
  FormLabel,
  Image,
  Input,
  Button,
  Select
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";



const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [studentInfo, setStudentInfo] = useState("");
  const api = useAxios();
  const [show, setShow] = useState(false);

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/student/${user.user_id}/student_profile/`
    );
    return response.data;
  };
  useEffect(() => {
    document.title = "CONNECT | Update Profile";
  }, []);
  const navigate = useNavigate();
  return (
  <UserLayout>
    <Stack m={5} spacing={5}>
        <SimpleGrid
          minChildWidth="300px"
          spacing={5}
          lineHeight={1.25}
          paddingBottom={40}
        >
          <Box bg="white" borderRadius="10px" box-shadow="md" padding={10}>
            <Flex justifyContent="center">
              <Image
                borderRadius="full"
                boxSize="300px"
                mb={4}
                src={userInfo.profile_picture}
                alt={userInfo.name}
              />
            </Flex>
            <Flex justifyContent="center">
              <Stack direction={["row"]} spacing="100px">
                <Box>
                  <Button onClick={() => navigate("/profile")} colorScheme="red" >
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <Button onClick={() => navigate("/profile")} colorScheme="green" >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Flex>
          </Box>
          <Box bg="white" borderRadius="10px" box-shadow="md" padding={8}>
            <SimpleGrid columns={2} spacingY="18px" >           
              <Text as="b" fontSize="lg">
                Old Password
              </Text>
              <FormControl>
              <Input size='sm' type="password" />
                <FormLabel fontSize="lg">{userInfo.oldpassword}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                New Password
              </Text>
              <FormControl>
              <Input type={show ? "text" : "password"} />
                <FormLabel fontSize="lg">
                  {userInfo.middle_initial ? userInfo.newpassword : ""}
                </FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Confirm New Password
              </Text>
              <FormControl>
                  <Input type={show ? "text" : "password"} /> 
                  <FormLabel fontSize="lg">
                  {userInfo.middle_initial ? userInfo.confirmpassword : ""} <br></br> 
                  <Flex justifyContent="right" >
              <Button
                      w='5rem'
                      h='2rem'
                      padding={2}
                      onClick={() =>
                        setShow((show) => !show)
                      }
                      
                      _hover={{
                          
                        color: "gray.600",
                      }}
                    >
                    {show ? 'Hide' : 'Show'}
                    </Button>
                    </Flex>
                    </FormLabel>
              </FormControl>
            
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Stack>

  </UserLayout>);
};

export default ChangePassword;
