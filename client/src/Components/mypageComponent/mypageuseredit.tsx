import React from "react";

import "../../css/components/MyPage/mypageuseredit.css";

const MypageEdit = () => {
  return (
    <div id="Mypage_useredit">
      <div className="Mypage_useredit_section">
        <div className="Mypage_useredit_title">회원 정보 수정</div>
        <div className="Mypgae_useredit_gap"></div>
        <div className="Mypage_useredit_nick section">
          <div className="Mypage_useredit_description">닉네임</div>

          <div className="Mypage_userdit_nick subsection">
            <input
              type="text"
              placeholder="오징어게임"
              className="Mypage_useredit_contents"
            ></input>
            <button className="Mypage_useredit_bt">변경하기</button>
          </div>
        </div>
        <div className="Mypgae_useredit_gap2"></div>
        <div className="Mypage_useredit_pass section">
          <div className="Mypage_useredit_description">비밀번호</div>

          <div className="Mypage_userdit_pass subsection">
            <input
              type="password"
              className="Mypage_useredit_contents"
            ></input>
            <button className="Mypage_useredit_bt">변경하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageEdit;
