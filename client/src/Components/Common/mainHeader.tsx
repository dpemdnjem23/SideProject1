import React, { useEffect, useState } from "react";
import "../../css/common/mainHeader.css";
import MainPage from "../../Pages/MainPage";
import {
  Route,
  BrowserRouter,
  Link,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useStore } from "Components/Login/Login";
import MypageModal from "Components/Modal/MypageModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import create from "zustand";
import {
  isSigninState,
  mainheaderuseStore,
  showErrModalState,
  useWalletStore,
} from "utils/state";

const Mainheader = () => {
  const navigate = useNavigate();
  const { showMypageModal, showMypageModalOn } = mainheaderuseStore();
  const { userSignin } = isSigninState();
  const { setShowSubEdit, setShowSubDetail } = useWalletStore();

  const { setShowErrModal } = showErrModalState();

  const handleErrModal = () => {
    setShowSubDetail(false);
    setShowSubEdit(false);
    if (localStorage.getItem("accessToken")) {
      setShowErrModal(false);
    } else {
      navigate("/");
      setShowErrModal(true);
    }
  };

  const openShowMypageModal = () => {
    if (showMypageModal === false) {
      showMypageModalOn(true);
    } else {
      showMypageModalOn(false);
    }
  };

  // const closeShowMypageModal = () =>{

  //   showMypageModalOn(false)
  // }

  // console.log( disabledSifa34 gnin)
  //로그인(로그아웃), 메인 페이지 , 구독 모음, 개인정보(회원탈퇴), 구독 공유, 구독 달력
  // console.log(disabledSignin)
  // console.log(disabledSignin)
  return (
    <>
      <div id="header">
        <div className="logo">
          <Link to="/">
            <img width="60" src="./images/2.png" />
          </Link>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="main_menu">
          <ul>
            <li className="menu">
              <Link to="/">메인페이지</Link>
            </li>
            <li onClick={handleErrModal} className="menu">
              <Link to="/wallet">구독지갑</Link>
            </li>
            <li className="menu">
              <Link to="/share">구독공유</Link>
            </li>
            <li onClick={handleErrModal} className="menu">
              <Link to="/callendar">구독달력</Link>
            </li>
            {userSignin ? (
              <li className="menu">
                <div>
                  <FontAwesomeIcon
                    width="60"
                    className="menu_bell"
                    icon={faBell}
                  />
                </div>
                <img
                  onClick={openShowMypageModal}
                  width="60"
                  src="./images/wallet-6551548.svg"
                ></img>
              </li>
            ) : (
              <li className="menu">
                <Link to="/login"> 로그인</Link>
              </li>
            )}
          </ul>
          {showMypageModal ? <MypageModal></MypageModal> : null}
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Mainheader;
