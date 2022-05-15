import React, { useContext, useEffect, useState } from "react";

import StudentLayout from "../../components/student/StudentLayout";

import AuthContext from "../../context/auth-context";
import useAxios from "../../utils/axios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [studentInfo, setStudentInfo] = useState("");
  const api = useAxios();

  const getUserProfile = async () => {
    const response = await api.get(
      `/api/user/student/${user.user_id}/student_profile/`
    );
    return response.data;
  };

  useEffect(() => {
    document.title = "CONNECT | Profile";
    
    getUserProfile()
      .then((res) => {
        let student = res;
        let account = res.account;
        delete student.account;
        setStudentInfo(student);
        setUserInfo(account);
        // console.log(studentInfo);
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

  return (
    <StudentLayout>
      {userInfo.first_name}
    {userInfo.last_name}
    {studentInfo.student_id}
    </StudentLayout>
  );
};

export default Profile;
