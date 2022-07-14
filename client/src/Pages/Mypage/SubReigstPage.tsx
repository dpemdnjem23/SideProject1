import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import SubRegistInfo from "Components/Mypage/mypagesub/subregistInfo";
import SubRegistPeriod from "Components/Mypage/mypagesub/subregistPeriod";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { showDropDownList } from "utils/state";

import "../../css/pages/SubRegisterPage.css";

const SubRegisterPage = () => {

  const { setDropDownOpen, dropDownOpen } = showDropDownList()


  const closeToggling = () => {
    setDropDownOpen(false);
    console.log(dropDownOpen);
  };

  return (
    <div onClick={closeToggling} id="RegisterPage">
      <SubRegistInfo />

      <SubRegistPeriod />
      <div className="RegisterPage_bt">
      <CancellationButton />
        <RegistButton />
      
      </div>
    </div>
  );
};

export default SubRegisterPage;
