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
import { Navigate } from "react-router";
import ShareRegisterPage from "Pages/Mypage/ShareRegisterPage";
import SubRegisterPage from "Pages/Mypage/SubReigstPage";

// import {
//   MainPage,
//   WalletPage,
//   SharePage,
//   UserPage,
//   CallendarPage,
// } from 'Pages'

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [signupModal, setSignupModal] = useState<boolean>(false);
  const [showRegist, setShowRegist] = useState<boolean>(false);
  const [showSubDetail, setShowSubDetail] = useState<boolean>(false);
  const [userEdit, setUserEdit] = useState<boolean>(false);
  const [delUser, setDelUser] = useState<boolean>(false);
  const [showCancellation, setShowCancellation] = useState<boolean>(false);
  const [showSubEdit, setShowSubEdit] = useState<boolean>(false);

  //modal을 클릭했을때 modal창이 뜯
  const openmodal = () => {
    setShowModal(true);
    setSignupModal(false);
  };
  const closemodal = () => {
    setShowModal(false);
    setSignupModal(false);
  };

  const openRegist = () => {
    setShowRegist(true);
  };
  const openSignupModal = () => {
    setShowModal(false);
    setSignupModal(true);
  };
  const openSubModal = () => {
    setShowSubDetail(true);
  };

  const closeSubModal = () => {
    setShowSubEdit(false);
    setShowSubDetail(false);
    setShowCancellation(false);
  };
  const changeEdit = () => {
    setUserEdit(true);
  };
  const deleteUser = () => {
    setDelUser(true);
  };

  const openCancellationModal = () => {
    setShowCancellation(true);
  };
  const closeCancellationModal = () => {
    setShowCancellation(false);
  };
  const openSubDetailEditModal = () => {
    setShowSubEdit(true);
  };
  const closeSubDetailEditModal = () => {
    setShowSubEdit(false);
  };

  // const openSignupModal = () => {
  //   setSignupModal(true);
  // };

  //상단 메뉴바에 있는 5개의 목록 -> 각각의 페이지로 연결한다.
  //app에선 router dom ㅇ로 page연결 시켜준다.
  //로그인 회원가입은 모달로 대체
  // 메인 header의 로그인을 클릭하면 모달창이 app.tsx에 켜진다.
  //로그인이 완료되면 로그인 ->mypage
  return (
    <BrowserRouter>
      <div id="App">
        {}
        {showModal ? (
          <Modal closemodal={closemodal} openSignupModal={openSignupModal} />
        ) : null}

        {signupModal ? (
          <SignupModal openmodal={openmodal} closemodal={closemodal} />
        ) : null}
        <Routes>
          {/* 메인헤더는 구독 등록과, 구독 모음 등록 할시에는 보이지않아야 한다. */}
          <Route element={<Mainheader onSignClick={openmodal} />}>

            <Route path="/" element={<MainPage />} />
            <Route
              path="/mypage"
              element={
                <MyPage
                  openRegist={openRegist}
                  userEdit={userEdit}
                  changeEdit={changeEdit}
                  deleteUser={deleteUser}
                />
              }
            />
            <Route
              path="/wallet"
              element={
                <WalletPage
                  showSubEdit={showSubEdit}
                  closeCancellationModal={closeCancellationModal}
                  closeSubDetailEditModal={closeSubDetailEditModal}
                  openSubDetailEditModal={openSubDetailEditModal}
                  showCancellation={showCancellation}
                  openCancellationModal={openCancellationModal}
                  subDetail={showSubDetail}
                  closeSubModal={closeSubModal}
                  openSubModal={openSubModal}
                />
              }
            />
            <Route
              path="/mypage/*"
              element={<Navigate replace to="/mypage" />}
            />
          </Route>
          {/* <Outlet></Outlet> */}
          <Route path="/callendar" element={<CallendarPage />} /> 

          <Route
            path="/subregist"
            element={<SubRegisterPage></SubRegisterPage>}
          ></Route>

          <Route
            path="/shareregist"
            element={<ShareRegisterPage></ShareRegisterPage>}
          ></Route>
          {/* <Route path="/*" element={<Navigate replace to="/" />} /> */}

          
        {/* <Route path="/collect/ion" element={<SharePage />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
