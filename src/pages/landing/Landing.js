import React from "react";
import Top from "./Top";
import FAQs from "./FAQs";
import TermsAndConditions from "./TermsAndConditions";
import Footer from "./Footer";

const Landing = () => {
  return (
    <main>
      <Top />
      <center><TermsAndConditions /></center>
      <FAQs />
      <Footer />
    </main>
  );
};

export default Landing;
