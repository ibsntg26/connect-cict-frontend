import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, useToast, } from "@chakra-ui/react";
import UserLayout from "../../components/UserLayout";
import axios from "axios";

const AdminAddEvaluator = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "useruser",
      password2: "useruser",
      first_name: "",
      middle_initial: "",
      last_name: "",
      employee_id: "",
    },
  });

  const toast = useToast();
  const registerEvaluator = async (data) => {
    data = {
      ...data,
      evaluator: {
        employee_id: data.employee_id,
      },
    };

    delete data.employee_id;

    axios
      .post("http://localhost:8000/api/user/evaluator/", data)
      .then((res) => {
        document.querySelector("form").reset();
        toast({
          title: "Account created.",
          description: "Evaluator has been created successfully.",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        const err_data = err.response.data;
        if (err_data.evaluator !== undefined) {
          setError("employee_id", {
            message: err_data.evaluator.employee_id[0],
          });
        }
        if (err_data.email !== undefined) {
          setError("email", {
            message: err_data.email[0],
          });
        }
        if (err_data.password !== undefined) {
          setError("password", {
            message: err_data.password[0],
          });
        }
      });
  };

  useEffect(() => {
    document.title = "CONNECT | Add Evaluator";
  }, []);

  return (
    <UserLayout>
      <Box overflow="auto">
        <Stack m={5} spacing={5}>
          <Center>
            <Heading fontSize="xl">Add New Evaluator</Heading>
          </Center>
          <Center>
            <Box
              bg="white"
              p={5}
              borderRadius="10px"
              box-shadow="md"
              w={{ sm: "85vw", md: "30vw" }}
            >
              <Stack spacing={4}>
                <Stack as="form" onSubmit={handleSubmit(registerEvaluator)}>
                  <Stack spacing={4} mb={10}>
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

                    <FormControl isInvalid={errors.employee_id}>
                      <FormLabel>Employee number</FormLabel>
                      <Input
                        type="number"
                        name="employee_id"
                        {...register("employee_id", {
                          required: "Enter your employee number",
                          valueAsNumber: true,
                        })}
                      />
                      <FormErrorMessage mb={3}>
                        {errors.employee_id && errors.employee_id.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl mb={2} isInvalid={errors.email}>
                      <FormLabel>Email address</FormLabel>
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
                  </Stack>

                  <Stack spacing={10}>
                    <Button type="submit" isLoading={isSubmitting}>
                      Create account
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Center>
        </Stack>
      </Box>
    </UserLayout>
  );
};

export default AdminAddEvaluator;
