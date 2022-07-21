import axios from "axios";
import { userInfo } from "os";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { cycleState, dateState, registSubInfoState } from "utils/state";

import "../../css/common/registButton.css";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

const RegistButton = () => {
  const { cycle } = cycleState();
  const { dateCal } = dateState();
  const { selected, subCash } = registSubInfoState();
  const userinfo:{id:number}= JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );

  //cost, cycle, localstorage =>id,
  const navigate = useNavigate()

// console.log(userinfo.id)
  

  const registWallet = () => {
    const number = subCash.replace(/,/g, "");
    const today = dateCal.format('YYYY-MM-DD')

    axios.post(
      `${process.env.REACT_APP_API_URI}/wallet/regist`,
      {
        cycle: cycle,
        start_date: today,
        name: selected,
        cost: number,
        id: userinfo.id,
      },

      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res)=>{
      navigate('/mypage')
      window.location.reload()
      //지갑 등록에 성공한경우 mypage로
      

    }).catch((err)=>{
    console.log(cycle,dateCal,selected,number,userinfo.id)
//지갑 등록에 실패한 경우
      alert('모든 정보를 입력해주세요')

    })
  };

  return (
    <div onClick={registWallet} className="regist_bt_section">
      <span>등록하기</span>
    </div>
  );
};

export default RegistButton;
