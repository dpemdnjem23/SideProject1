import React, { useState } from "react";
import "../../css/common/mainHeader.css";
import MainPage from "../../Pages/MainPage";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
//왜 tsx는 FC를 넣을까?
//

const Mainheader = ({ onSignClick }: any) => {
  const [showModal, setShowModal] = useState(false);

  //main header 에 들어갈것
  //로그인(로그아웃), 메인 페이지 , 구독 모음, 개인정보(회원탈퇴), 구독 공유, 구독 달력

  return (
    <div id="header">
      <span className="logo">
        <Link to="/">
          <img
            width="60"
            src="./images/2.png"
          />
        </Link>
      </span>
      <div className="main_menu">
        <ul>
          <li className="menu">
            <Link to="/">메인페이지</Link>
          </li>
          <li className="menu">
            <Link to="/wallet">구독지갑</Link>
          </li>
          <li className="menu">
            <Link to="/collection">구독모음</Link>
          </li>
          <li className="menu">
            <Link to="/callendar">구독달력</Link>
          </li>
          <li className="menu" onClick={() => onSignClick()}>
            로그인
          </li>
          <li className="menu">
          <Link to="/mypage">마이페이지</Link>

          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mainheader;
