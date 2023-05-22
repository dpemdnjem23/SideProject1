import { instance } from "App";
import React, { useEffect, useState } from "react";
import { useNavigate,NavigateFunction } from "react-router";
import { isSigninState } from "utils/state";

import "../../../css/components/MyPage/MobileMyPage/mobileMyPageWithdrawal.css"

const MobileMyPageUserWithdrawal = () => {

  const {persistLogin} = isSigninState()
const navigate:NavigateFunction = useNavigate()

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const handleUserWithdrawal = () => {
    instance.delete(`/user/withdrawal`, {
      data: {
        id: userinfo.id,
      },
    }).then(()=>{
      persistLogin(false)
        //회원탈퇴에 성공했을시 로컬스토리 정보 삭제

        localStorage.clear()
        navigate('/')
        
    }).catch((err)=>{
        throw err
        

    })
  };
  return (
    <div className="Mypage_withdrawal_section">
      <div className="Mypage_withdrawal_gap"></div>

      <div className="Mypage_withdrawal_text">
        <div className="Mypage_withdrawal_text_top">
          회원 탈퇴를 하시겠습니까?
        </div>

        <div className="Mypage_withdrawal_text_main">
          회원 탈퇴를 하면 되돌릴 수 없습니다 신중히 선택해주세요
          <br></br> 버튼을 클릭하면 바로 탈퇴가 됩니다.
        </div>

        <button onClick={handleUserWithdrawal}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default MobileMyPageUserWithdrawal;
