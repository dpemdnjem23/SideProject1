import React, { useEffect, useState } from "react";
import {
  mobileMypageUseStore,
  mypageUserInfoState,
  showMypageState,
} from "utils/state";

import "../../../css/components/MyPage/MobileMyPage/mobileMyPageSocialEdit.css";
import MobileMyPageNotification from "./mobileMyPageNotification";

const MobileMyPageSocial = () => {
  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );
  const {
    mobileMenuName,
    mobileMenu,
    setMobileMenu,
    setMobileMenuName,
    setMobilePassEdit,
    setMobileUserEdit,
    mobilePassEdit,
    mobileUserEdit,
  } = mobileMypageUseStore();
  const { mobileNoti, setMobileNoti } = mobileMypageUseStore();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const [nickErrMessage, setNickErrMessage] = useState<string>("");

  const { setNickname, nickname, setPassword, password } =
    mypageUserInfoState();

  const spaceBarBlock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleNicknameNoti = () => {
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
            setMobileNoti(true);
            if (mobileNoti) {
              setMobileNoti(false);
            }
            //   setShowNicknameNotiModal(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleUserNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNickErrMessage("");
  };

  return (
    <div className="MobileMyPage_socialEdit_section">
      <div className="MobileMyPage_socialEdit_nick Msection">
        <div className="MobileMyPage_socialEdit_description">닉네임</div>

        <div className="MobileMyPage_socialEdit_nick_sub Msubsection">
          <input
            maxLength={7}
            onKeyDown={spaceBarBlock}
            onChange={handleUserNick}
            type="text"
            placeholder={userinfo.nickname}
            className="MobileMyPage_socialEdit_contents"
          ></input>
          <div className="MobileMyPage_socialEdit_secbt">
            <button
              onClick={handleNicknameNoti}
              className="MobileMyPage_socialEdit_bt"
            >
              변경하기
            </button>
          </div>
        </div>
      </div>
      <div className="MobileMyPage_socialEdit_gap2"></div>

      <span className="MobileMyPage_socialEdit_nickErr">{nickErrMessage}</span>

      {mobileNoti ? (
        <MobileMyPageNotification></MobileMyPageNotification>
      ) : null}
    </div>
  );
};

export default MobileMyPageSocial;
