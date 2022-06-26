import React, { FC } from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import logo from "./logo.svg";
import Modal from "./Pages/SigninPage";
import "./css/reset.css";
import { Route, Navigate,useNavigate,BrowserRouter, Routes } from "react-router-dom";
import "./App.css";

import Mainheader from "Components/Common/mainHeader";
import MainPage from "Pages/MainPage";
import WalletPage from "Pages/WalletPage";
import SharePage from "Pages/SharePage";
import CalendarPage from "Pages/CalenderPage";
import MyPage from "Pages/MyPage";
import ShareRegisterPage from "Pages/Mypage/ShareRegisterPage";
import SubRegisterPage from "Pages/Mypage/SubReigstPage";
import CalendarSelect from "Pages/calendarSelectPage";
import SigninPage from "./Pages/SigninPage";
import MainHeaderLogo from "Components/Common/mainHeaderLogo";
import SignupPage from "Pages/SignupPage";
import MypageModal from "Components/Modal/MypageModal";

// import {
//   MainPage,
//   WalletPage,
//   SharePage,
//   UserPage,
//   CallendarPage,
// } from 'Pages'

type SigninInfo = {
  username: string;
  password: string;
};
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] =  'Bearer token'
axios.defaults.headers.post["Content-Type"] = "application/json";

const App = () => {
// const navigate =useNavigate()

  ///로그인 부분


  // disabledSignin={disabledSignin}

  return (
    <BrowserRouter>
      <div id="App">

        <MypageModal></MypageModal>
        {/* 로그인을 하면  로그인이 사라지고 마이페이지가 생겨야한다. */}
        <Routes>
          {/* 메인헤더는 구독 등록과, 구독 모음 등록 할시에는 보이지않아야 한다. */}
          <Route element={<Mainheader  />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage  />} />
            <Route
              path="/wallet"
              element={
                <WalletPage
               
                />
              }
            />
            <Route
              path="/mypage/*"
              element={<Navigate replace to="/mypage" />}
            />
          </Route>

          <Route element={<MainHeaderLogo />}> 
            <Route path="/login" element={<SigninPage ></SigninPage>} />
            <Route path="/signup" element={<SignupPage></SignupPage>} />
          </Route>

          <Route path="/callendar" element={<CalendarPage />} />

          <Route
            path="/subregist"
            element={<SubRegisterPage></SubRegisterPage>}
          ></Route>

          <Route
            path="/shareregist"
            element={<ShareRegisterPage></ShareRegisterPage>}
          ></Route>

          <Route
            path="/calendarselect"
            element={<CalendarSelect></CalendarSelect>}
          ></Route>
          {/* <Route path="/*" element={<Navigate replace to="/" />} /> */}

          {/* <Route path="/collect/ion" element={<SharePage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
