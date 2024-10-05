import React from "react";
import Show_Test from "../../components/Diagnostic_center/Test/Show_Test";
import "../../styles/Diagnostic_center/pages/All_Test.css";

const Alltest = () => {
  return (
    <div>
      <h2>Available Tests In Your Center</h2>
      <Show_Test />
    </div>
  );
};

export default Alltest;
