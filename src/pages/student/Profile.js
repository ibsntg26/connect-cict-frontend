import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Flex,
  SimpleGrid,
  Box,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Image,
  Button
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

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
        // console.log(userInfo);
      })
      .catch((e) => {
        alert(e.message);
      });
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
                  <Button onClick={() => navigate("/updateprofile")} colorScheme="orange" variant="ghost">
                    Update Details
                  </Button>
                </Box>
                <Box>
                  <Button onClick={() => navigate("/changepassword")} colorScheme="orange" variant="ghost">
                    Change Password
                  </Button>
                </Box>
              </Stack>
            </Flex>
          </Box>
          <Box bg="white" borderRadius="10px" box-shadow="md" padding={8}>
            <SimpleGrid columns={2} spacingY="31px">
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
                <FormLabel fontSize="lg">{userInfo.first_name}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Middle Initial
              </Text>
              <FormControl>
                <FormLabel fontSize="lg">
                  {userInfo.middle_initial ? userInfo.middle_initial : "_"}
                </FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Last Name
              </Text>
              <FormControl>
                <FormLabel fontSize="lg">{userInfo.last_name}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Year and Section
              </Text>
              <FormControl>
                <FormLabel fontSize="lg">
                  {studentInfo.year_level ? (studentInfo.year_level).charAt(0) : studentInfo.year_level}{studentInfo.section}
                </FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Email Address
              </Text>
              <FormControl>
                <FormLabel fontSize="lg">{userInfo.email}</FormLabel>
              </FormControl>

              <Text as="b" fontSize="lg">
                Home Address
              </Text>
              <FormControl>
                <FormLabel fontSize="lg">N/A</FormLabel>
              </FormControl>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Stack>
    </UserLayout>
  );
};

export default Profile;
