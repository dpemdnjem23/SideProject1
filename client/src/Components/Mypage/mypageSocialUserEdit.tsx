import React from "react";

import "../../css/components/MyPage/mypageSocialuseredit.css";

const MypageSocialEdit = () => {
  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );
  const spaceBarBlock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }

    const handleUserNick = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
      setNickErrMessage("");
    };
  };

  return (
    <div id="Mypage_socialUserEdit">
      <div className="Mypage_socialUserEdit_section">
        <div className="Mypage_socialUserEdit_title">회원 정보 수정</div>
        <div className="Mypage_socialUserEdit_gap"></div>
        <div className="Mypage_socialUserEdit_nick section">
          <div className="Mypage_socialUserEdit_description">닉네임</div>

          <div className="Mypage_socialUserEdit_nick_sub subsection">
            <input
                          maxLength={7}
                          onKeyDown={spaceBarBlock}


              type="text"
              placeholder={userinfo.nickname}
              className="Mypage_socialUserEdit_contents"
            ></input>
            <button className="Mypage_socialUserEdit_bt">변경하기</button>
          </div>
        </div>
      </div>
      <span className="Mypage_useredit_nickErr">{nickErrMessage}</span>

    </div>
  );
};

export default MypageSocialEdit;
