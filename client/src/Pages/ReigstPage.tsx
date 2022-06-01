import SubRegistInfo from "Components/mypageComponent/mypagesub/subregistInfo";
import SubRegistPeriod from "Components/mypageComponent/mypagesub/subregistPeriod";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";


const RegisterPage = () => {
  return (
    <div id="RegisterPage">
      <SubRegistInfo />

      <SubRegistPeriod />
    </div>
  );
};

export default RegisterPage;
