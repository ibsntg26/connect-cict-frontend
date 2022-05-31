import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useDisclosure, } from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import ProfileLayout from "../../components/ProfileLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const StudentProfileUpdate = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [userPicture, setUserPicture] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      profile_picture: null,
    },
  });

  const api = useAxios();
  const navigate = useNavigate();
  const year_levels = ["1st", "2nd", "3rd", "4th"];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/student/${user.user_id}/student_profile/`
    );
    return response.data;
  };

  const updateProfile = async (data) => {
    setIsSubmitting(true);

    if (data.profile_picture !== null)
      data.profile_picture = data.profile_picture[0];

    await api
      .put(`/api/user/student/${user.student_id}/`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        const err_data = err.response.data;
        if (err_data.email !== undefined) {
          setError("email", {
            message: err_data.email[0],
          });
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const deleteAccount = async () => {
    api
      .delete(`/api/user/${user.user_id}/`)
      .then((res) => {
        logoutUser();
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
        setUserPicture(account.profile_picture);

        reset({
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
    <>
      <Modal
        onClose={onClose}
        size="md"
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to permanently delete your account?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              No
            </Button>
            <Button variant="ghost" color="orange.400" onClick={deleteAccount}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ProfileLayout>
        <Flex
          as="form"
          onSubmit={handleSubmit(updateProfile)}
          align="center"
          flexDir="column"
          mb={4}
        >
          <Image
            borderRadius="full"
            borderColor="gray.200"
            boxSize="200px"
            src={userPicture}
            alt={user.name}
          />
          <Box py={2}>
            <Button
              type="submit"
              colorScheme="orange"
              size="sm"
              leftIcon={<FaUserEdit />}
              variant="ghost"
              me={2}
              isLoading={isSubmitting}
            >
              Save changes
            </Button>

            <Button
              onClick={() => {navigate('../profile')}}
              colorScheme="gray"
              size="sm"
              variant="ghost"
            >
              Cancel
            </Button>
          </Box>
        </Flex>
        <Box>
          <SimpleGrid column={2} spacingY="15px">
            <FormControl isInvalid={errors.profile_picture}>
              <FormLabel>Profile Picture</FormLabel>
              <Input
                type="file"
                name="profile_picture"
                accept="image/*"
                {...register("profile_picture")}
              />
              <FormErrorMessage>
                {errors.profile_picture && errors.profile_picture.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.first_name}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                {...register("first_name", {
                  required: "Enter your first name",
                })}
              />
              <FormErrorMessage>
                {errors.first_name && errors.first_name.message}
              </FormErrorMessage>
            </FormControl>

            <HStack alignItems="baseline">
              <FormControl maxWidth={110} isInvalid={errors.middle_initial}>
                <FormLabel>Middle Initial</FormLabel>
                <Input
                  type="text"
                  name="middle_initial"
                  maxLength={3}
                  {...register("middle_initial")}
                />
              </FormControl>

              <FormControl isInvalid={errors.last_name}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="last_name"
                  {...register("last_name", {
                    required: "Enter your last name",
                  })}
                />
                <FormErrorMessage>
                  {errors.last_name && errors.last_name.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <HStack alignItems="baseline">
              <FormControl isInvalid={errors.year_level}>
                <FormLabel>Year Level</FormLabel>
                <Select
                  name="year_level"
                  {...register("year_level", {
                    required: "Select your year level",
                  })}
                >
                  {year_levels.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage mb={3}>
                  {errors.year_level && errors.year_level.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.section}>
                <FormLabel>Section</FormLabel>
                <Input
                  type="text"
                  name="section"
                  maxLength={1}
                  {...register("section", {
                    required: "Enter your section",
                  })}
                />
                <FormErrorMessage mb={3}>
                  {errors.section && errors.section.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl mb={2} isInvalid={errors.email}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                {...register("email", {
                  required: "Enter your email",
                })}
              />
              <FormErrorMessage mb={3}>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
        </Box>

        <Button
          type="submit"
          colorScheme="red"
          size="sm"
          leftIcon={<RiUserUnfollowFill />}
          onClick={onOpen}
          variant="ghost"
          mt={10}
        >
          Delete account
        </Button>
      </ProfileLayout>
    </>
  );
};

export default StudentProfileUpdate;
