import React from "react";
import "../../css/common/mainHeader.css";
import MainPage from "../../Pages/MainPage";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
//왜 tsx는 FC를 넣을까?
//
const Mainheader = () => {
  //main header 에 들어갈것
  //로그인(로그아웃), 메인 페이지 , 구독 모음, 개인정보(회원탈퇴), 구독 공유, 구독 달력

  return (
    <BrowserRouter>
      <div id="header">
        <Routes>
          <div className="main_menu">
            
            <span className="logo">subgather</span>
            <ul>
              <li className="menu">구독지갑</li>
              <li className="menu">구독모음</li>
              <li className="menu">구독달력</li>

              <li className="menu">로그인/회원가입</li>
            </ul>
          </div>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Mainheader;
