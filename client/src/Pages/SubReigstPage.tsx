import CancellationButton from "Components/common/cancellationButoon";
import RegistButton from "Components/common/registButton";
import SubRegistInfo from "Components/mypageComponent/mypagesub/subregistInfo";
import SubRegistPeriod from "Components/mypageComponent/mypagesub/subregistPeriod";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "../css/pages/SubRegisterPage.css";

const RegisterPage = () => {
  return (
    <div id="RegisterPage">
      <SubRegistInfo />

      <SubRegistPeriod />
      <div className="RegisterPage_bt">
      <CancellationButton />
        <RegistButton />
      
      </div>
    </div>
  );
};

export default RegisterPage;
