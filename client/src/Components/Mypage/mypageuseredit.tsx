import { instance } from "App";
import React, { useState } from "react";
import {
  mypageNotiModalState,
  mypageUserInfoState,
  showMypageState,
} from "utils/state";

import "../../css/components/MyPage/mypageuseredit.css";

const MypageEdit = () => {
  const accessToken: string | null = localStorage.getItem("accessToken");

  const [nickErrMessage, setNickErrMessage] = useState<string>("");
  const [passErrMessage, setPassErrMessage] = useState<string>("");

  const userInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

  const { setEditUser, passEditUser, setPassEditUser, setDelUser } =
    showMypageState();

  const { setNickname, nickname, setPassword, password } =
    mypageUserInfoState();

  const { showNicknameNotiModal, setShowNicknameNotiModal } =
    mypageNotiModalState();

  const handleNicknameNotiModal = () => {
    if (!nickname) {
      setNickErrMessage("닉네임을 입력해주세요");
    } else {
      const regNickname = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,7}$/;

      if (!regNickname.test(nickname)) {
        setNickErrMessage("닉네임을 제대로입력해주세요");
      } else {
        instance
          .post(`/auth/nickcheck`, { nickname: nickname })

          .then((result) => {
            setShowNicknameNotiModal(true);
          })
          .catch((err) => {
            setShowNicknameNotiModal(false);
            setNickErrMessage("동일한 닉네임이 존재합니다.");
            console.log(err);
          });
      }
    }
  };

  const handlePasswordCheck = () => {
    if (!password) {
      setPassErrMessage("비밀번호를 입력해주세요");
    } else {
      // const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

      // if (!regPassword.test(password)) {
      //   setPassErrMessage(
      //     "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
      //   );

      // else{

      fetch(`${process.env.REACT_APP_API_URI}/auth/passcheck`, {
        method: "post",
        body: JSON.stringify({
          password: password,
        }),
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res: any) => {
          if (!res.ok) {
            setPassErrMessage("비밀번호가 일치하지 않습니다.");

            // setShowNicknameNotiModal(false);
            throw new Error(res.status);
          }
          return res.text();
        })
        .then((result) => {
          setPassEditUser(true);
          setEditUser(false);

          // setShowNicknameNotiModal(true);
        })
        .catch((err) => {
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
    <div id="Mypage_useredit">
      <div className="Mypage_useredit_section">
        <div className="Mypage_useredit_title">회원 정보 수정</div>
        <div className="Mypgae_useredit_gap"></div>
        <div className="Mypage_useredit_nick section">
          <div className="Mypage_useredit_description">닉네임</div>
          <div className="Mypage_userdit_nick_sub subsection">
            <input
              onKeyDown={spaceBarBlock}
              maxLength={7}
              onChange={handleUserNick}
              type="text"
              placeholder={userInfo.nickname}
              className="Mypage_useredit_contents"
            ></input>
            <button
              onClick={handleNicknameNotiModal}
              className="Mypage_useredit_bt"
            >
              변경하기
            </button>
          </div>
        </div>
        <span className="Mypage_useredit_nickErr">{nickErrMessage}</span>

        <div className="Mypgae_useredit_gap2"></div>
        <div className="Mypage_useredit_pass section">
          <div className="Mypage_useredit_description">비밀번호</div>

          <div className="Mypage_userdit_pass subsection">
            <input
              onChange={handleUserPass}
              type="password"
              className="Mypage_useredit_contents"
            ></input>
            <button
              onClick={handlePasswordCheck}
              className="Mypage_useredit_bt"
            >
              변경하기
            </button>
          </div>
        </div>
        <span className="Mypage_useredit_nickErr">{passErrMessage}</span>
      </div>
    </div>
  );
};

export default MypageEdit;
