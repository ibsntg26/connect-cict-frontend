import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import UserLayout from "../../components/UserLayout";

const StudentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/tickets");
  }, []);

  return (
    <UserLayout>
      <div>Student Dashboard</div>
    </UserLayout>
  );
};

export default StudentDashboard;
