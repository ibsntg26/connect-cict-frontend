import React, { useContext, useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import dayjs from "dayjs";

import { Box, Button, Center, Flex, Image, SimpleGrid, Text, } from "@chakra-ui/react";

import UserProfileLayout from "../../components/UserProfileLayout";
import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

function renderInfo(key, value) {
  return (
    <Box>
      <Text>{key}</Text>
      <Text as="b" fontSize="xl">
        {value}
      </Text>
    </Box>
  );
}

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
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

  return (
    <UserProfileLayout>
      <Box bg="white" borderRadius="10px" boxShadow="md" padding={10}>
        <Flex flexDir="row" justifyContent="center">
          <Image
            borderRadius="full"
            border="1px"
            borderColor="gray.200"
            boxSize="200px"
            mb={4}
            src={userInfo.profile_picture}
            alt={user.name}
          />
        </Flex>
        <Box>
          <Center>
            <ReactLink to="/updateprofile">
              <Button colorScheme="orange" variant="ghost">
                Update Profile
              </Button>
            </ReactLink>
            <Box me={10}></Box>
            <ReactLink to="/changepassword">
              <Button colorScheme="orange" variant="ghost">
                Change Password
              </Button>
            </ReactLink>
          </Center>
        </Box>
      </Box>

      <Box bg="white" borderRadius="10px" boxShadow="md" padding={10}>
        <SimpleGrid column={2} spacingY="15px">
          {renderInfo("Student Number", `${studentInfo.student_id}`)}
          {renderInfo("Full Name", `${userInfo.first_name} ${userInfo.middle_initial} ${userInfo.last_name}`)}
          {userInfo.year_level ? renderInfo("Year and Section", `${(studentInfo.year_level).charAt(0)}${studentInfo.section}`) :
          renderInfo("Year and Section", `${studentInfo.year_level} | ${studentInfo.section}`)}
          {renderInfo("Email Address", `${userInfo.email}`)}
          {renderInfo("Last Login", `${dayjs(userInfo.last_login).format('ddd, MMM D, YYYY h:mm A')}`)}
        </SimpleGrid>
      </Box>
    </UserProfileLayout>
  );
};

export default Profile;
