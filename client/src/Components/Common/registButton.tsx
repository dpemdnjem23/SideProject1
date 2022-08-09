import axios from "axios";
import { userInfo } from "os";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import {  cycleState, dateState, registSubInfoState } from "utils/state";

import "../../css/common/registButton.css";

const RegistButton = () => {
  const { cycleCal } = cycleState();
  const { dateCal } = dateState();
  const { selected, subCash } = registSubInfoState();

  const accessToken = localStorage.getItem("accessToken");

  //cost, cycle, localstorage =>id,
  const navigate = useNavigate();

  // console.log(userinfo.id)

  const registWallet = () => {
    const number = subCash.replace(/,/g, "");
    const today = dateCal.format("YYYY-MM-DD");

    //end_date를 계산해서 넣는다.
    
    console.log(accessToken)

    fetch(`${process.env.REACT_APP_API_URI}/wallet/regist`, {
      method: "post",
      body: JSON.stringify({
        cycleYear:cycleCal.year,
        cycleMonth:cycleCal.month,
        cycleDay: cycleCal.day,
        start_date: today,
        name: selected,
        cost: number,
      }),
      credentials: "include",
      headers: {
        'authorization':`Bearer ${accessToken}`,
        'Content-Type':'application/json',
      },
    })
      .then((res: any) => {
        // window.location.reload()
        if (!res.ok) {
  //         if(res.status===401){
  //           navigate('/')

  // }
          throw new Error(res.status);
        }
      

        return res.text();
        //지갑 등록에 성공한경우 mypage로
      })
      .then((result) => {
        navigate("/mypage");
      })
      .catch((err) => {
        // navigate('/')
        //지갑 등록에 실패한 경우
        alert("모든 정보를 입력해주세요");
      });
  };

  return (
    <div onClick={registWallet} className="regist_bt_section">
      <span>등록하기</span>
    </div>
  );
};

export default RegistButton;
