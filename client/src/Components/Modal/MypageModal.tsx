import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faBell,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import create from "zustand";
import "../../css/common/modal/MypageModal.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "Components/Login/Login";
import { mainheaderuseStore } from "Components/Common/mainHeader";
import { isSigninState } from "utils/state";
//로그아웃을 누르면 로그아웃이 되면서 로그인 해제

//모달 닫기버튼은 app.js로 넘기고싶다.

//로그아웃을 하면 쿠키제거, 로컬스토리지 제거 새로고침
const MypageModal = () => {
  const { showMypageModalOn } = mainheaderuseStore();
  const { mypageOn }: any = useStore();

  const {persistLogin} = isSigninState()

  const handleSignout = () => {
    console.log(`Bearer ` + localStorage.getItem("accessToken"));
    axios
      .get(`${process.env.REACT_APP_API_URI}/auth/signout`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        // persistLogin(false)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("subgatherUserInfo");
       
        showMypageModalOn(false);
        isSigninState.persist.clearStorage();

        window.location.reload();
      })
      .catch((err) => {
        persistLogin(false)

        localStorage.removeItem("accessToken");
        alert("로그인이 만료되었습니다. 다시 로그인해주세요");
        isSigninState.persist.clearStorage();
        localStorage.removeItem("subgatherUserInfo");

        window.location.reload()

        throw err;
      });
  };

  return (
    <div id="MypageModal">
      <div className="MypageModal_section">
        <img width="50" src="./images/wallet-6551548.svg" />
        <div className="MypageModal_section_textarea">
          <span>님의</span>
          <br></br>
          <Link to="/mypage">
            <div>
              마이페이지 <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </Link>
        </div>
      </div>
      <div className="MypageModal_line"></div>

      <div onClick={handleSignout} className="MypageModal_section">
        <div>로그아웃</div>
      </div>
    </div>
  );
};

export default MypageModal;
