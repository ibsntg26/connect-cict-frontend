import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import UserLayout from "../../components/UserLayout";
import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const EvaluatorDashboard = () => {
  useEffect(() => {
    document.title = "CONNECT | Evaluator Dashboard";
  }, []);

  return <UserLayout>Evaluator Dashboard</UserLayout>;
};

export default EvaluatorDashboard;
