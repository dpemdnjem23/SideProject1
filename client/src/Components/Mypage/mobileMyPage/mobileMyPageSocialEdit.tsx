import React, { useEffect, useState } from "react";
import {mypageUserInfoState, showMypageState } from "utils/state";

import "../../../css/components/MyPage/MobileMyPage/mobileMyPageSocialEdit.css";

const MobileMyPageSocial= () => {
  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );
  const accessToken: string | null = localStorage.getItem("accessToken");

  const [nickErrMessage, setNickErrMessage] = useState<string>("");

  const { setNickname, nickname, setPassword, password } =
    mypageUserInfoState()
  const spaceBarBlock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }

    const handleNickname = () => {
      if (!nickname) {
        setNickErrMessage("닉네임을 입력해주세요");
      } else {
        const regNickname = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,7}$/;

        if (!regNickname.test(nickname)) {
          setNickErrMessage("닉네임을 제대로입력해주세요");
        } else {
          fetch(`${process.env.REACT_APP_API_URI}/auth/nickcheck`, {
            method: "post",
            body: JSON.stringify({
              nickname: nickname,
            }),
            headers: {
              authorzation: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((res: any) => {
              if (!res.ok) {
                // setShowNicknameNotiModal(false);
                setNickErrMessage("동일한 닉네임이 존재합니다.");
                throw new Error(res.status);
              }
              return res.text();
            })
            .then((result) => {
            //   setShowNicknameNotiModal(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    };

    const handleUserNick = (e: React.ChangeEvent<HTMLInputElement>) => {
      // setNickname(e.target.value);
      // setNickErrMessage("");
    };
  };

  return (
    <div id="MobileMyPage_socialEdit">
      <div className="MobileMyPage_socialEdit_section">
        <div className="MobileMyPage_socialEdit_nick section">
          <div className="MobileMyPage_socialEdit_description">닉네임</div>

          <div className="MobileMyPage_socialEdit_nick_sub subsection">
            <input
              maxLength={7}
              onKeyDown={spaceBarBlock}
              type="text"
              placeholder={userinfo.nickname}
              className="MobileMyPage_socialEdit_contents"
            ></input>
            <button className="MobileMyPage_socialEdit_bt">변경하기</button>
          </div>
        </div>
      </div>
      {/* <span className="MobileMyPage_userelickErr">{nickErrMessage}</span> */}
    </div>
  );
};

export default MobileMyPageSocial
