import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Flex, useColorModeValue } from "@chakra-ui/react";

import Sidebar from "../../components/Sidebar";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const { user, role, canReport, logoutUser, setCanReport } =
    useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    document.title = "Dashboard";

    setIsLoading(true);
    const getTickets = async () => {
      const response = await api.get("/api/student-ticket/");
      return response.data;
    };
    getTickets()
      .then((res) => {
        const flag = res.pop(); //pop the last element (create report permission)
        setCanReport(flag["report_perm"] ? flag["report_perm"] : false);
        setTickets(res);
      })
      .catch((e) => {
        // alert(e.message);
      });

    setIsLoading(false);
  }, []);

  // const getTickets = () => {
  //   api.get("/api/student-tickets/").then((res) => {
  //     if (res.status === 200) setTickets(res.data);
  //     else alert("Data could not be fetched!");
  //   });
  // };

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  return (
    <Flex
      bg={useColorModeValue("gray.50", "gray.800")}
      maxH="100vh"
      maxW="100vw"
      overflow="auto"
    >
      <Sidebar user={user} role={role} />
      <Flex>
        {user && <p>Hello {user.email}</p>}
        <div>
          <h4>Open tickets</h4>
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id}>{ticket.message}</li>
            ))}
          </ul>
        </div>
        {canReport && <p>Can create</p>}
        {role}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
