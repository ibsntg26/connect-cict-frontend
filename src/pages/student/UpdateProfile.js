import React from "react";

import UserLayout from "../../components/UserLayout";

const UpdateProfile = () => {
  useEffect(() => {
    document.title = "CONNECT | Update Profile";
  }, []);

  return <UserLayout>UpdateProfile</UserLayout>;
};

export default UpdateProfile;
