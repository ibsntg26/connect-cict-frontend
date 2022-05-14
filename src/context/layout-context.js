import { createContext, useState, useEffect } from "react";
// import axios from "axios";

const LayoutContext = createContext();
export default LayoutContext;
export const LayoutProvider = ({ children }) => {
  const [siteLogoMD, setSiteLogoMD] = useState("");
  const [siteLogoXS, setSiteLogoXS] = useState("");
  const [sidebarWidth, changeSidebarWidth] = useState("30vh");
  const [navSize, changeNavSize] = useState("large");
  const axios = require('axios');

  useEffect(() => {
    const getSettings = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin-settings/"
      );
      const data = response.data;
      setSiteLogoXS(data[1].value);
      setSiteLogoMD(data[2].value);
    };

    getSettings();

    // getSettings().then((res) => {
    //   console.log(res.data);
    // });
    // axios.get(`http://127.0.0.1:8000/api/admin-settings/`).then((res) => {
    //   console.log(res.data);
    // });
  });

  const contextData = {
    navSize: navSize,
    sidebarWidth: sidebarWidth,
    siteLogoMD: siteLogoMD,
    siteLogoXS: siteLogoXS,
    changeNavSize: changeNavSize,
    changeSidebarWidth: changeSidebarWidth,
  };

  return (
    <LayoutContext.Provider value={contextData}>
      {children}
    </LayoutContext.Provider>
  );
};
