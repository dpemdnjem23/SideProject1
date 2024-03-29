import { instance } from "App";
import React, { useEffect, useState } from "react";
import {
  mobileMypageUseStore,
  mypageNotiModalState,
  mypageUserInfoState,
  showMypageState,
} from "utils/state";

import "../../../css/components/MyPage/MobileMyPage/mobileMyPageUserEdit.css";
import MobileMyPageNotification from "./mobileMyPageNotification";
import MobileMyPagePassEdit from "./mobileMyPagePassEdit";

const MobileMyPageUserEdit = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");

  const [nickErrMessage, setNickErrMessage] = useState<string>("");
  const [passErrMessage, setPassErrMessage] = useState<string>("");

  const userInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

  const { setEditUser, passEditUser, setPassEditUser, setDelUser } =
    showMypageState();

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

  const { setNickname, nickname, setPassword, password } =
    mypageUserInfoState();
  const { mobileNoti, setMobileNoti } = mobileMypageUseStore();

  const { showNicknameNotiModal, setShowNicknameNotiModal } =
    mypageNotiModalState();

  const handleNicknameNoti = () => {
    if (!nickname) {
      setNickErrMessage("닉네임을 입력해주세요");
    } else {
      const regNickname = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,7}$/;

      if (!regNickname.test(nickname)) {
        setNickErrMessage("닉네임을 제대로입력해주세요");
        if (mobileNoti) {
          setMobileNoti(false);
        }
      } else {
        instance
          .post(`${process.env.REACT_APP_API_URI}/auth/nickcheck`, {
            nickname: nickname,
          })

          .then((result) => {
            setMobileNoti(true);
            if (mobileNoti) {
              setMobileNoti(false);
            }
          })
          .catch((err) => {
            setNickErrMessage("동일한 닉네임이 존재합니다.");
          });
      }
    }
  };

  const handlePasswordCheck = () => {
    if (!password) {
      setPassErrMessage("비밀번호를 입력해주세요");
    } else {
      instance
        .post(`${process.env.REACT_APP_API_URI}/auth/passcheck`, {
          password: password,
        })

        .then((result) => {
          setEditUser(true);
          setPassEditUser(false);
          setEditUser(false);
          setMobilePassEdit(true);
          if (mobilePassEdit) {
            setMobilePassEdit(false);
          }

          // setShowNicknameNotiModal(true);
        })
        .catch((err) => {
          setPassErrMessage("비밀번호가 일치하지 않습니다.");
          if (mobilePassEdit) {
            setMobilePassEdit(false);
          }

          console.log(err);
        });
    }
  };

  const handleUserNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNickErrMessage("");
  };

  const handleUserPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassErrMessage("");
  };

  const spaceBarBlock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="mobileMypage_useredit_section">
      {mobilePassEdit ? null : (
        <>
          <div className="mobileMypage_useredit_nick Msection">
            <div className="mobileMypage_useredit_description">닉네임</div>
            <div className="mobileMypage_userdit_nick_sub Msubsection">
              <input
                onKeyDown={spaceBarBlock}
                maxLength={7}
                onChange={handleUserNick}
                type="text"
                placeholder={userInfo.nickname}
                className="mobileMypage_useredit_contents"
              ></input>
              <div className="mobileMypage_useredit_secbt">
                <button
                  onClick={handleNicknameNoti}
                  className="mobileMypage_useredit_bt"
                >
                  변경하기
                </button>
              </div>
            </div>
          </div>
          <div className="mobileMypgae_useredit_gap2"></div>

          <span className="mobileMypage_useredit_nickErr">
            {nickErrMessage}
          </span>

          <div className="mobileMypgae_useredit_gap2"></div>
        </>
      )}
      {mobileNoti ? null : (
        <>
          <div className="mobileMypage_useredit_pass Msection">
            <div className="mobileMypage_useredit_description">비밀번호</div>

            <div className="mobileMypage_userdit_pass Msubsection">
              <input
                onChange={handleUserPass}
                type="password"
                className="mobileMypage_useredit_contents"
              ></input>
              <div className="mobileMypage_useredit_secbt">
                <button
                  onClick={handlePasswordCheck}
                  className="mobileMypage_useredit_bt"
                >
                  변경하기
                </button>
              </div>
            </div>
          </div>
          <div className="mobileMypgae_useredit_gap2"></div>

          <span className="mobileMypage_useredit_passErr">
            {passErrMessage}
          </span>
        </>
      )}
      {mobileNoti ? (
        <MobileMyPageNotification></MobileMyPageNotification>
      ) : null}
      {mobilePassEdit ? <MobileMyPagePassEdit></MobileMyPagePassEdit> : null}
    </div>
  );
};

export default MobileMyPageUserEdit;
