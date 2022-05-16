import React, { useContext, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import {
  Flex,
  SimpleGrid,
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Image,
  Input,
  Button,
  Select
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";



const UpdateProfile = () => {
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
                Student Number
              </Text>
              <FormControl>
                <FormLabel>{studentInfo.student_id}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                First Name
              </Text>
              <FormControl>
              <Input size='sm' type="firstname" />
                <FormLabel fontSize="lg">{userInfo.first_name}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Middle Initial
              </Text>
              <FormControl>
              <Input size='sm' name="middle_initial" />
                <FormLabel fontSize="lg">
                  {userInfo.middle_initial ? userInfo.middle_initial : ""}
                </FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Last Name
              </Text>
              <FormControl>
              <Input size='sm' name="lastname" />
                <FormLabel fontSize="lg">{userInfo.last_name}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Year and Section
              </Text>
              <FormControl>
              <SimpleGrid columns={2} spacingX="1px">
                  <Select width={"7vw"} height="3.5vh">
                      <option value='1st'>1st</option>
                      <option value='2nd'>2nd</option>
                      <option value='3rd'>3rd</option>
                      <option value='4th'>4th</option>
                  </Select>
                <Input size='sm' name="year_and_sec" /> 
                </SimpleGrid>
                <FormLabel fontSize="lg">
                  {studentInfo.year_level ? (studentInfo.year_level).charAt(0) : studentInfo.year_level}{studentInfo.section}
                </FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Email Address
              </Text>
              <FormControl>
              <Input size='sm' name="emailadd" />
                <FormLabel fontSize="lg">{userInfo.email}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Home Address
              </Text>
              <FormControl>
              <Input size='sm' name="homeaddress" />
                <FormLabel fontSize="lg">{userInfo.homeaddress}</FormLabel>
              </FormControl>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Stack>

  </UserLayout>);
};

export default UpdateProfile;
