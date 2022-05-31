import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, useDisclosure, } from "@chakra-ui/react";
import { FaUserEdit } from "react-icons/fa";
import { RiUserUnfollowFill } from "react-icons/ri";
import ProfileLayout from "../../components/ProfileLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const EvaluatorProfileUpdate = () => {
  const { user, role, logoutUser } = useContext(AuthContext);
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/evaluator/${user.user_id}/evaluator_profile/`
    );
    return response.data;
  };

  const updateProfile = async (data) => {
    setIsSubmitting(true);

    if (data.profile_picture !== null)
      data.profile_picture = data.profile_picture[0];

    await api
      .put(`/api/user/evaluator/${user.evaluator_id}/`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => {
        role === "evaluator"
          ? navigate("/profile")
          : navigate("/admin/profile");
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
      });;
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
        let evaluator = res;
        let account = res.account;
        delete evaluator.account;
        setUserPicture(account.profile_picture);

        reset({
          profile_picture: null,
          email: account.email,
          first_name: account.first_name,
          middle_initial: account.middle_initial,
          last_name: account.last_name,
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

        {role === "evaluator" && (
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
        )}
      </ProfileLayout>
    </>
  );
};

export default EvaluatorProfileUpdate;
