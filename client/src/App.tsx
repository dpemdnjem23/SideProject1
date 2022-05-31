import React, { FC } from "react";
import { useState, useEffect } from "react";

import logo from "./logo.svg";
import Modal from "./Components/Modal/signModal";
import SignupModal from "./Components/Modal/signupModal";
import "./css/reset.css";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import "./App.css";

import Mainheader from "Components/common/mainHeader";
import MainPage from "Pages/MainPage";
import WalletPage from "Pages/WalletPage";
import SharePage from "Pages/SharePage";
import CallendarPage from "Pages/CallenderPage";
import MyPage from "Pages/MyPage";
import RegisterPage from "Pages/ReigstPage";

// import {
//   MainPage,
//   WalletPage,
//   SharePage,
//   UserPage,
//   CallendarPage,
// } from 'Pages'

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [signupModal, setSignupModal] = useState<boolean>(false);

  //modal을 클릭했을때 modal창이 뜯
  const openmodal = () => {
    setShowModal(true);
  };

  const openSignupModal = () => {
    setSignupModal(true);
  };

  //상단 메뉴바에 있는 5개의 목록 -> 각각의 페이지로 연결한다.
  //app에선 router dom ㅇ로 page연결 시켜준다.
  //로그인 회원가입은 모달로 대체
  // 메인 header의 로그인을 클릭하면 모달창이 app.tsx에 켜진다.
  //로그인이 완료되면 로그인 ->mypage
  return (
    <BrowserRouter>
      <div id="App">
        {showModal ? (
          <Modal setShowModal={setShowModal} setSignupModal={setSignupModal} />
        ) : null}

        {signupModal ? (
          <SignupModal
            setShowModal={setShowModal}
            setSignupModal={setSignupModal}
          />
        ) : null}
        {/* 사인 모달에서 회원가입을 누르면 사인업 모달이 뜬다. */}

        {/* 메인헤더에서 로그인을 클릭하면 모달창이 뜬다. */}
        <Mainheader onSignClick={openmodal} />
        <Routes>
          <Route path="/" element={<MainPage />} />

          {/* <Route path="/subregist" element={<RegisterPage />} /> */}
                                                      
                                                      
          {/* <Route path="/walllet" element={<WalletPage />} />
        <Route path="/collection" element={<SharePage />} />
        <Route path="/callendar" element={<CallendarPage />} /> */}
          <Route path="/mypage" element={<MyPage />} />

          {/* <header className="App-header"> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
