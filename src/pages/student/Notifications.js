import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NotificationItem from "../../components/NotificationItem";

import {
  Flex,
  Center,
  SimpleGrid,
  Box,
  Stack,
  FormControl,
  FormLabel,
  Image,
  HStack,
} from "@chakra-ui/react";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Notifications = () => {
  const [userNotifications, setUserNotifications] = useState([]);
  const api = useAxios();

  const getNotifications = async () => {
    const response = await api.get(`/api/notification/`);
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Notifications";
    getNotifications()
      .then((res) => {
        setUserNotifications(res);
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Stack m={3} spacing={5}>
        <Flex as="b" fontSize="3xl" paddingTop={5}>
          Notifications
        </Flex>
        <SimpleGrid spacingY="10px">
          {userNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              pic={notification.receiver.profile_picture}
              name={
                notification.receiver.first_name +
                " " +
                notification.receiver.last_name
              }
              message={notification.message}
              date={notification.date_created}
              ticket ={notification.ticket && (notification.ticket)}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </UserLayout>
  );
};

export default Notifications;
