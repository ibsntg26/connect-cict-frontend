import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
  Select,
} from "@chakra-ui/react";

import axios from "axios";

import UserLayout from "../../components/UserLayout";
import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [studentInfo, setStudentInfo] = useState("");
  const [formData, updateFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = useAxios();
  const navigate = useNavigate();
  const year_levels = ["1st", "2nd", "3rd", "4th"];

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/student/${user.user_id}/student_profile/`
    );
    return response.data;
  };

  const changeHandler = (e) => {
    if (e.target.name == "profile_picture") {
      updateFormData({
        ...formData,
        'profile_picture': e.target.files[0],
      });
    } else {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);

    axios
      .put(
        `http://127.0.0.1:8000/api/user/student/${user.student_id}/`,
        {
          profile_picture: formData.profile_picture,
          email: formData.email,
          first_name: formData.first_name,
          middle_initial: formData.middle_initial,
          last_name: formData.last_name,
          year_level: formData.year_level,
          section: formData.section,
        },
        {
          headers: { "content-type": "multipart/form-data" },
        }
      )
      .then((res) => {
        navigate("/profile");
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    document.title = "CONNECT | Update Profile";

    getUserProfile()
      .then((res) => {
        let student = res;
        let account = res.account;
        delete student.account;
        setStudentInfo(student);
        setUserInfo(account);

        updateFormData({
          profile_picture: null,
          email: account.email,
          first_name: account.first_name,
          middle_initial: account.middle_initial,
          last_name: account.last_name,
          year_level: student.year_level,
          section: student.section,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

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
                  <Button
                    onClick={() => navigate("/profile")}
                    colorScheme="red"
                  >
                    Cancel
                  </Button>
                </Box>
                <Box>
                  <Button
                    onClick={() => {
                      document.getElementById("updateSubmit").click();
                    }}
                    colorScheme="green"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Stack>
            </Flex>
          </Box>
          <Box bg="white" borderRadius="10px" box-shadow="md" padding={8}>
            <form onSubmit={submitHandler}>
              <SimpleGrid columns={2} spacingY="18px">
                <Text as="b" fontSize="lg">
                  Student Number
                </Text>
                <FormControl>
                  <FormLabel>{studentInfo.student_id}</FormLabel>
                </FormControl>

                <Text as="b" fontSize="lg">
                  Profile Picture
                </Text>
                <FormControl>
                  <Input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={changeHandler}
                  />
                </FormControl>

                <Text as="b" fontSize="lg">
                  Email Address
                </Text>
                <FormControl isRequired>
                  <Input
                    type="email"
                    name="email"
                    defaultValue={userInfo.email}
                    onChange={changeHandler}
                  />
                </FormControl>

                <Text as="b" fontSize="lg">
                  First Name
                </Text>
                <FormControl isRequired>
                  <Input
                    type="text"
                    name="first_name"
                    defaultValue={userInfo.first_name}
                    onChange={changeHandler}
                  />
                </FormControl>

                <Text as="b" fontSize="lg">
                  Middle Initial
                </Text>
                <FormControl>
                  <Input
                    type="text"
                    name="middle_initial"
                    defaultValue={userInfo.middle_initial}
                    onChange={changeHandler}
                  />
                </FormControl>

                <Text as="b" fontSize="lg">
                  Last Name
                </Text>
                <FormControl isRequired>
                  <Input
                    type="text"
                    name="last_name"
                    defaultValue={userInfo.last_name}
                    onChange={changeHandler}
                  />
                </FormControl>

                <Text as="b" fontSize="lg">
                  Year and Section
                </Text>
                <FormControl isRequired>
                  <SimpleGrid columns={2} spacingX="1px">
                    <Select name="year_level" onChange={changeHandler}>
                      {/* value={studentInfo.year_level} */}
                      {year_levels.map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="text"
                      name="section"
                      maxLength={1}
                      defaultValue={studentInfo.section}
                      onChange={changeHandler}
                    />
                  </SimpleGrid>
                </FormControl>
              </SimpleGrid>
              <Input type="submit" id="updateSubmit" display="none" />
            </form>
          </Box>
        </SimpleGrid>
      </Stack>
    </UserLayout>
  );
};

export default UpdateProfile;
