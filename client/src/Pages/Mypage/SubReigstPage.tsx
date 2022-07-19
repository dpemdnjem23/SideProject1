import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import SubRegistInfo from "Components/Mypage/mypagesub/subregistInfo";
import SubRegistPeriod from "Components/Mypage/mypagesub/subregistPeriod";
import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { showDropDownList } from "utils/state";

import "../../css/pages/SubRegisterPage.css";

const SubRegisterPage = () => {

  const { setDropDownOpen, dropDownOpen } = showDropDownList()


  const closeToggling = () => {
    setDropDownOpen(false);
    console.log(dropDownOpen);
  };
useEffect(()=>{
  
  console.log('axios')

})



  //구독 지갑에 구독 등록하기 => 구독정보, 가격 , 싸이클, 구독시작날짜를
  //입력받아서 axios (서버) 로 넘겨준다. regist button 클릭시 적용되도록

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
