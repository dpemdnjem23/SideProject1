import React, { FC } from "react";
import { useState, useEffect } from "react";

import logo from "./logo.svg";
import Modal from "./Components/Modal/signModal";
import "./css/reset.css";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import "./App.css";
import "./css/reset.css"
import Mainheader from "Components/common/mainHeader";
import MainPage from "Pages/MainPage";
import WalletPage from "Pages/WalletPage";
import SharePage from "Pages/SharePage";
import CallendarPage from "Pages/CallenderPage";
import UserPage from "Pages/UserPage";

// import {
//   MainPage,
//   WalletPage,
//   SharePage,
//   UserPage,
//   CallendarPage,
// } from 'Pages'

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  //modal을 클릭했을때 modal창이 뜯
  const openmodal = () => {
    setShowModal(true);
  };

  //상단 메뉴바에 있는 5개의 목록 -> 각각의 페이지로 연결한다.
  //app에선 router dom ㅇ로 page연결 시켜준다.
  //로그인 회원가입은 모달로 대체

  return (
    <BrowserRouter>
    
        <div className="App">
          {showModal ? <Modal setShowModal={setShowModal} /> : null}
          <Mainheader />
          <Routes>
        
                {/* <Link to="/">홈</Link> */}
          <Route path="/" element={<MainPage />} />
         
          {/* <Route path="/walllet" element={<WalletPage />} />
        <Route path="/collection" element={<SharePage />} />
        <Route path="/callendar" element={<CallendarPage />} />
        <Route path="/callendar" element={<UserPage />} /> */}

          {/* <header className="App-header"> */} 
          </Routes>
       

     
          <button onClick={openmodal}>modal</button>
        </div>
    
    </BrowserRouter>
  );
};

export default App;
