import React from "react";

const MypageEdit = () => {
  return (
    <div className="Mypage_useredit">
      <div className="Mypage_useredit_section">
        <div className="Mypage_useredit_title">회원 정보 수정</div>
        <div className="Mypgae_useredit_gap">
          <div className="Mypage_useredit_nick section">
            <div className="Mypage_useredit_description">닉네임</div>

            <div className="Mypage_userdit_nick subsection"></div>
            <div className="Mypage_useredit_id contetns">오징어게임</div>
            <button className="Mypage_useredit_id bt">변경하기</button>
          </div>
          <div className="Mypage_useredit_pass section">
            <div className="Mypage_useredit_description">비밀번호</div>

            <div className="Mypage_userdit_pass subsection"></div>
            <div className="Mypage_useredit_pass contents">오징어게임</div>
            <button className="Mypage_useredit_pass bt">변경하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageEdit;
