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

const EvaluatorProfile = () => {
  const { user, role } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [evaluatorInfo, setEvaluatorInfo] = useState("");
  const api = useAxios();

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/evaluator/${user.user_id}/evaluator_profile/`
    );
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Profile";

    getUserProfile()
      .then((res) => {
        let evaluator = res;
        let account = res.account;
        delete evaluator.account;
        setEvaluatorInfo(evaluator);
        setUserInfo(account);
      })
      .catch((e) => {
        alert(e.message);
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
          <ReactLink to={role === 'evaluator' ? "/profile/update/" : "/admin/profile/update/"}>
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

          <ReactLink to={role === 'evaluator' ? "/profile/change-password/" : "/admin/profile/change-password/"}>
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
          {renderInfo("Employee Number", `${evaluatorInfo.employee_id}`)}
          {renderInfo(
            "Full Name",
            `${userInfo.first_name} ${userInfo.last_name}`
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

export default EvaluatorProfile;
