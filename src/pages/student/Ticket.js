import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserLayout from "../../components/UserLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Ticket = () => {
  const { user } = useContext(AuthContext);
  const [ticketInfo, setTicketInfo] = useState("");
  const [ticketType, setTicketType] = useState("");

  const api = useAxios();
  const { ticketId } = useParams();

  const getTicketDetails = async () => {
    const response = await api.get(`/api/ticket/${ticketId}/`);
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Ticket";
    getTicketDetails()
      .then((res) => {
        let ticket = res;
        let type = res.type.name;
        delete ticket.type;
        setTicketInfo(ticket);
        setTicketType(type);
        // console.log(ticketInfo);
      })
      .catch((e) => {
        alert(e.message);
      });

      // insert get followups
  }, []);

  return <UserLayout>
    {ticketInfo.id}
    {ticketType}
    {ticketInfo.message}
  </UserLayout>;
};

export default Ticket;
