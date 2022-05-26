import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Switch, SimpleGrid, useToast, } from "@chakra-ui/react";
import ProfileLayout from "../../components/ProfileLayout";

const StudentPasswordChange = () => {
  const [show, setShow] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const updatePassword = async (data) => {
    if (data.new_password === data.new_password2) {
        navigate('/profile');
    } else {
        toast({
            title: "New password do not match.",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
    }
  };

  useEffect(() => {
    document.title = "CONNECT | Change Password";
  }, []);

  return (
    <ProfileLayout>
      <Box as="form" onSubmit={handleSubmit(updatePassword)}>
        <SimpleGrid column={2} spacingY="15px">
          <FormControl mb={2} isInvalid={errors.old_password}>
            <FormLabel>Old password</FormLabel>
            <Input
              type={show ? "text" : "password"}
              name="password"
              {...register("old_password", {
                required: "Enter old password",
                minLength: {
                  value: 8,
                  message: "Enter 8 characters or longer",
                },
              })}
            />
            <FormErrorMessage mb={3}>
              {errors.old_password && errors.old_password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={2} isInvalid={errors.new_password}>
            <FormLabel>New password</FormLabel>
            <Input
              type={show ? "text" : "password"}
              name="new_password"
              {...register("new_password", {
                required: "Enter new password",
                minLength: {
                  value: 8,
                  message: "Enter 8 characters or longer",
                },
              })}
            />
            {errors.new_password ? (
              <FormErrorMessage mb={3}>
                {errors.new_password && errors.new_password.message}
              </FormErrorMessage>
            ) : (
              <FormHelperText>
                Your new password must contain at least 8 characters.
              </FormHelperText>
            )}
          </FormControl>

          <FormControl mb={2} isInvalid={errors.new_password2}>
            <FormLabel>Confirm new password</FormLabel>
            <Input
              type={show ? "text" : "password"}
              name="new_password2"
              {...register("new_password2", {
                required: "Re-type new password",
                minLength: {
                  value: 8,
                  message: "Enter 8 characters or longer",
                },
              })}
            />
            <FormErrorMessage mb={1}>
              {errors.new_password2 && errors.new_password2.message}
            </FormErrorMessage>
          </FormControl>

          <Switch
            colorScheme="orange"
            size="sm"
            onChange={() => setShow((show) => !show)}
            mb={4}
          >
            Show password
          </Switch>

          <Button
            type="submit"
            colorScheme="orange"
            me={2}
            isLoading={isSubmitting}
          >
            Save changes
          </Button>
        </SimpleGrid>
      </Box>
    </ProfileLayout>
  );
};

export default StudentPasswordChange;
