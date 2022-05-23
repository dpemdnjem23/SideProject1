import React from "react";

import "../css/pages/Mypage.css";
const MyPage = () => {
  //가운데 메인 내정보
  //사이드 정보
  return (
    <div id="Mypage">
      <div className="Mypage_section">
        <div className="Mypage_left section">
          <div className="Mypage_user">
            dfgsdfgd
            <span className="Mypage_user_text">내 정보</span>
          </div>
          <span className="Mypage_sub_text">나의 구독</span>
          <div className="Mypage_sub_section">
            <div className="Mypage_1 sub">
              <div className="Mypage_1_textarea">
                <span>나만의 구독을 등록해주세요</span>
                <span>구독 등록</span>
                <span>구독 등록 하러 가기 </span>
              </div>
            </div>
            <div className="Mypage_2 sub">
              <div className='Mypage_2_textarea'>
              <span>구독 모음</span>
              <span>나의 구독을 글과 함께 공유해요!</span>
              <div>
                <span>구독 모음 등록하러 가기</span>
              </div>

              </div>
            
            </div>
          </div>
        </div>
        <div className="Mypage_right section"></div>
      </div>
    </div>
  );
};

export default MyPage;
