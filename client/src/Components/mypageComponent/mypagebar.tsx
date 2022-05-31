import React, { useState, useEffect, useRef } from "react";
import "../../css/components/MyPage/mypagebar.css";

// const s = document.getElemnetsByClassName()

const Mypagebar = ({setUserEdit,setPayList}:any) => {
  //useRef로 Dom을 가져와
  //

 

  const changeEdit = () => {
    setUserEdit(true);
    setPayList(false);
  };
  const changeList = () => {
    setUserEdit(false);
    setPayList(true);
  };

  //현재 결제가 남은 구독갯수

  //top에는 결제일이 3일남앗다 3일남은 구독이 몇갡지
  //bottom에는 개인정보 수정 / 구독
  //center에는 남은 결제액 / 총액수

  //span의 변화가 일어나면 위쪽의 css도변화를 준다.

  //회원 정보수정을 누르면 메인 화면이 변한다.
  //섭개더 구독결제 현황을 누르면 메인화면이 변하고 결제내역을 보여준다.
  return (
    <>
      <div className="Mypage_bar_top container">
        <div className="Mypage_bar_top title">결제 현황 관리</div>
        <div className="Mypage_bar_top_section">
          <div className="Mypage_bar_top_section1">
            <span className="Mypage_bar_top_section1_days">결제일 </span>

            <span className="Mypage_bar_top_section1_pay">결제금액</span>

            {/* <span className="Mypage_bar_top_section1_pay2">결제 금액</span>
             */}
          </div>
          <div className="Mypage_bar_top_section2">
            <span className="Mypage_bar_top_section2_days">13 일</span>
            <span className="Mypage_bar_top_section2_slash">/</span>
            <span className="Mypage_bar_top_section2_pay">5,000 원</span>
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
            <span className="Mypage_bar_center_section1_pay">지출 총액</span>
          </div>
          <div className="Mypage_bar_center_section2">
            <span className="Mypage_bar_center_section1_comp2">5,000</span>
            <span className="Mypage_bar_top_section2_slash">/</span>
            <span className="Mypage_bar_center_section1_pay2">85,000</span>
          </div>
        </div>
        <div className="Mypage_bar_gap"></div>
      </div>
      <div className="Mypage_bar_gap"></div>
      <div className="Mypage_bar_bottom container">
        <div className="Mypage_bar_bottom title">섭개더 관리</div>
        <div className=" Mypage_bar_bottom_section">
          <div onClick={changeEdit}>회원 정보 수정</div>
          <div onClick={changeList}>회원탈퇴</div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Mypagebar;
