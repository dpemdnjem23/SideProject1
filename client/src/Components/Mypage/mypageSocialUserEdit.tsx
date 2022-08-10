import React from "react";

import "../../css/components/MyPage/mypageSocialuseredit.css";

const MypageSocialEdit = () => {
    const userinfo = JSON.parse(
        localStorage.getItem("subgatherUserInfo") || `{}`
      );

      
  return (

    
    <div id="Mypage_socialUserEdit">
      <div className="Mypage_socialUserEdit_section">
        <div className="Mypage_socialUserEdit_title">회원 정보 수정</div>
        <div className="Mypgae_useredit_gap"></div>
        <div className="Mypage_socialUserEdit_nick section">
          <div className="Mypage_socialUserEdit_description">닉네임</div>

          <div className="Mypage_userdit_nick subsection">
            <input
              type="text"
              placeholder={userinfo.nickname}
              className="Mypage_socialUserEdit_contents"
            ></input>
            <button className="Mypage_socialUserEdit_bt">변경하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageSocialEdit;
