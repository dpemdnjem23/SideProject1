import React, { useEffect, useState } from "react";
import "../../css/common/mainHeader.css";
import MainPage from "../../Pages/MainPage";
import { Route, BrowserRouter, Link, Routes, Outlet } from "react-router-dom";
import { useStore } from "Components/Login/Login";
import MypageModal from "Components/Modal/MypageModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import create from "zustand";
import { isSigninState } from "utils/state";

//왜 tsx는 FC를 넣을까?
//

// type mypageState ={
//   disabledSignin:boolean
//   mypageOff:() =>void

//   mypageOn:() =>void
// }

type showModaleState = {
  showMypageModal: boolean;
  showMypageModalOn: (input: boolean) => void;

  // mypageOn: (input: boolean) => void;
};

export const mainheaderuseStore = create<showModaleState>((set) => ({
  showMypageModal: false,
  showMypageModalOn: (input) =>
    set(() => ({
      showMypageModal: input,
    })),
}));

const Mainheader = () => {
  const { showMypageModal, showMypageModalOn } = mainheaderuseStore();
  // const { userSignin } = isSigninState();

  // console.log(userSignin)
  // console.log(persistLogin)
  // useEffect(()=>{

  // },[])

  // useStore.setState({userSignin:true})

  // console.log(userSignin)
  //  const [showMypageModal,setShowMypageModal]  = useState<boolean>(false)

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
            <li className="menu">
              <Link to="/wallet">구독지갑</Link>
            </li>
            <li className="menu">
              <Link to="/share">구독공유</Link>
            </li>
            <li className="menu">
              <Link to="/callendar">구독달력</Link>
            </li>
            {/* {userSignin ? ( */}
              <li className="menu">
                <FontAwesomeIcon className="menu_bell" icon={faBell} />
                <img
                  onClick={openShowMypageModal}
                  width="60"
                  src="./images/wallet-6551548.svg"
                ></img>
              </li>
            {/* ) : ( */}
              <li className="menu">
                <Link to="/login"> 로그인</Link>
              </li>
            {/* )} */}
          </ul>
          {showMypageModal ? <MypageModal></MypageModal> : null}
        </div>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Mainheader;
