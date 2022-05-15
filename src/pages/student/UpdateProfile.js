import React from "react";

import StudentLayout from "../../components/student/StudentLayout";

const UpdateProfile = () => {
  useEffect(() => {
    document.title = "CONNECT | Update Profile";
  }, []);

  return <StudentLayout>UpdateProfile</StudentLayout>;
};

export default UpdateProfile;
