import React, { useState, useEffect } from "react";
import { Flex, Heading, Stack, SimpleGrid, Text } from "@chakra-ui/react";
import UserLayout from "../components/UserLayout";
import NotificationItem from "../components/NotificationItem";

import useAxios from "../utils/axios";

const UserNotifications = () => {
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
        console.log(e.message);
      });
  }, []);

  return (
    <UserLayout>
      <Flex justify="center" overflow="auto">
        <Stack w={{ base: "full", md: "40vw" }} m={2} spacing={5}>
          <Heading size="md">Notifications</Heading>
          <SimpleGrid spacingY={8}>
            {userNotifications.length > 0 ? (
              userNotifications.map((notification) => (
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
                  ticket={notification.ticket && notification.ticket}
                />
              ))
            ) : (
              <Text
                fontWeight={600}
                textAlign="center"
                fontSize="lg"
                color="gray.400"
                marginTop={5}
              >
                No new notifications yet.
              </Text>
            )}
          </SimpleGrid>
        </Stack>
      </Flex>
    </UserLayout>
  );
};

export default UserNotifications;
