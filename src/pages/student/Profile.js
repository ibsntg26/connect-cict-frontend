import React, { useContext, useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import dayjs from "dayjs";
import { Box, Button, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import ProfileLayout from "../../components/ProfileLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

function renderInfo(key, value) {
  return (
    <Box>
      <Text fontSize="sm">{key}</Text>
      <Text fontSize="lg" fontWeight={600}>
        {value}
      </Text>
    </Box>
  );
}

const StudentProfile = () => {
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
        console.log(e.message);
      });
  }, []);

  return (
    <ProfileLayout>
      <Flex align="center" flexDir="column" mb={4}>
        <Image
          borderRadius="full"
          borderColor="gray.200"
          boxSize="200px"
          src={userInfo.profile_picture}
          alt={user.name}
        />
        <Box py={2}>
          <ReactLink to="/profile/update/">
            <Button
              colorScheme="orange"
              size="sm"
              leftIcon={<FaUserEdit />}
              variant="ghost"
              me={2}
            >
              Update profile
            </Button>
          </ReactLink>

          <ReactLink to="/profile/change-password/">
            <Button
              colorScheme="orange"
              size="sm"
              variant="ghost"
            >
              Change password
            </Button>
          </ReactLink>
        </Box>
      </Flex>
      <Box>
        <SimpleGrid column={2} spacingY="15px">
          {renderInfo("Student Number", `${studentInfo.student_id}`)}
          {renderInfo(
            "Full Name",
            `${userInfo.first_name} ${userInfo.middle_initial && userInfo.middle_initial + '.'} ${userInfo.last_name}`
          )}
          {userInfo.year_level
            ? renderInfo(
                "Year and Section",
                `${studentInfo.year_level.charAt(0)}${studentInfo.section}`
              )
            : renderInfo(
                "Year and Section",
                `${studentInfo.year_level} | ${studentInfo.section}`
              )}
          {renderInfo("Email Address", `${userInfo.email}`)}
          {renderInfo(
            "Last Login",
            `${dayjs(userInfo.last_login).format("ddd, MMM D, YYYY h:mm A")}`
          )}
        </SimpleGrid>
      </Box>
    </ProfileLayout>
  );
};

export default StudentProfile;
