import axios from "axios";
import React, { useState } from "react";
import {mypagePaymentManagementState, mypageSubCostState, showMypageState } from "utils/state";
import "../../css/components/MyPage/mypagebar.css";

// const s = document.getElemnetsByClassName()

const Mypagebar = () => {
  //

  //한번더 클릭하면 원래대로 돌아가야한다.
  // const { setDelUser, setEditUser, editUser, delUser } = showMypageState();
// const {paymentDay , setPaymentDay}  = useState<number>(0)
const {mypagePaymentManageCost,mypagePaymentManageDate} = mypagePaymentManagementState()
const{subCost,subPayment} = mypageSubCostState()
const { setDelUser, setEditUser, editUser, delUser,passEditUser,setPassEditUser,setSocialEditUser,socialEditUser } = showMypageState();

  

const handleEditUser = () => {
  //마이페이지에서 같은 걸 한번더 클릭하면 원래대로 돌아오도록 한다.
  if (editUser ||delUser||passEditUser||socialEditUser) {
    setEditUser(false);
    setDelUser(false);
    setPassEditUser(false)
    setSocialEditUser(false)
  } else {
    setEditUser(true);
    setDelUser(false);
  }
};

const handleDelUser = () => {
  //마이페이지에서 같은 걸 한번더 클릭하면 원래대로 돌아오도록 한다.
  if (delUser === true) {
    setDelUser(false);
    setEditUser(false);
  } else {
    setDelUser(true);
    setEditUser(false);
  }
};


   
//결제완료는 start_date가 지난 것만따진다
  return (
    <>
      <div className="Mypage_bar_top container">
        <div className="Mypage_bar_top title">결제 현황 관리</div>
        <div className="Mypage_bar_top_section">
          <div className="Mypage_bar_top_section1">
            <span className="Mypage_bar_top_section1_days">결제 일 </span>
            <br></br>
            <span className="Mypage_bar_top_section1_day">{mypagePaymentManageDate} 일</span>
 
            {/* <span className="Mypage_bar_top_section1_pay2">결제 금액</span>
             */}
          </div>

          <div className="Mypage_bar_top_section2">
            <br></br>
            <span className="Mypage_bar_top_section2_slash">/</span>
          </div>
          <div className="Mypage_bar_top_section3">
            <span className="Mypage_bar_top_section1_pay">결제 금액</span>
            <br></br>

            <span className="Mypage_bar_top_section2_pay"> {mypagePaymentManageCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</span>
          </div>
        </div>
        {/* <span>3-days / 2 (결제금액)</span> */}
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_center container">
        <div className="Mypage_bar_center title">구독 정산 관리</div>
        <div className="Mypage_bar_center_section">
          <div className="Mypage_bar_center_section1">
            <span className="Mypage_bar_center_section1_comp">결제 완료</span>
            <br></br>

            <div className="Mypage_bar_center_section1_comp2">{subCost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</div>
          </div>

          <div className="Mypage_bar_center_section2">
            <br></br>
            <span className="Mypage_bar_center_section2_slash">/</span>
          </div>
          <div className="Mypage_bar_center_section3">
            <span className="Mypage_bar_center_section1_pay">지출 총액</span>
            <br></br>

            <span className="Mypage_bar_center_section1_pay2">{subPayment.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} 원</span>
          </div>
        </div>
        <div className="Mypage_bar_gap"></div>
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_bottom container">
        <div className="Mypage_bar_bottom title">섭개더 관리</div>
        <div className=" Mypage_bar_bottom_section">
          <div onClick={handleEditUser}>회원 정보 수정</div>
          <div onClick={handleDelUser}>회원탈퇴</div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Mypagebar;
