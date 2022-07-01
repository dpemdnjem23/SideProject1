import React, { useState, useEffect } from "react";
import axios from "axios";

import "./css/reset.css";
import {
  Route,
  Navigate,
  useNavigate,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import "./App.css";

import Mainheader, { mainheaderuseStore } from "Components/Common/mainHeader";
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
import { isSigninState } from "utils/state";
import { useStore } from "Components/Login/Login";

// import {
//   MainPage,
//   WalletPage,
//   SharePage,
//   UserPage,
//   CallendarPage,
// } from 'Pages'

axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] =  'Bearer token'
axios.defaults.headers.post["Content-Type"] = "application/json";

type localPerson = {
  username?: any;
  id?: any;
  nickname?: any;
};
const App = () => {
  const today = new Date().getTime() / 1000;

  //오늘 time이 accessExp 만료되기전에 해야하니깐 60초? 60초 미리 확인해서 로그인하도록 한다
  //다시 refresh token이 만료되는 경우 에만 작동되어야 한다. refresh가 없으면 로그아웃이 되는데
  // 로그아웃인경우는 작동하지 않는다.

  console.log(today);
  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );

  const { persistLogin, userSignin } = isSigninState();

  const issueAccessToken = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/auth/issueaccess`,
        {
          username: localstorageUserInfo.username,
          nickname: localstorageUserInfo.nickname,
          id: localstorageUserInfo.id,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        //accesstoken을 보냈더니 기간만료 전이야 그러면 재발급
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem(
          "subgatherUserInfo",
          JSON.stringify(res.data.data)
        );
        console.log("토큰재발급함");
      })
      .catch(() => {
        //accesstoken을 보냈더니 refreshk 가만료면 로그아웃을 한다.
        persistLogin(false);
        console.log("리프레쉬 토큰 사라졋어");

        localStorage.removeItem("accessToken");
        // alert("로그인이 만료되었습니다. 다시 로그인해주세요");
        isSigninState.persist.clearStorage();
        localStorage.removeItem("subgatherUserInfo");

        // window.location.reload()
        // isSigninState.persist.clearStorage()
      });
  };
  useEffect(() => {
    if (
      localstorageUserInfo.accessExp < today ||
      localstorageUserInfo.refreshExp < today
    ) {
      issueAccessToken();
    }
  }, []);

  //1. 새로고침, 이동할때마다 통신을 하여 리프레쉬 토큰이 만료된경우 -> 로그아웃
  //2. 만약 액세스 토큰이 만료된경우라면 만료되기전에 다시 access를 재발급 한다.

  const { showMypageModalOn } = mainheaderuseStore();

  const closeShowMypageModal = () => {
    showMypageModalOn(false);
  };
  //1. 리프레쉬 토큰은 쿠키에 존재한다.
  //2. 액세스 토큰이 만료되면 리프레쉬 토큰으로 액세스 토큰 재발급
  //3.
  // console.log(document.cookie.match('refreshToken'))
  return (
    <BrowserRouter>
      <div onClick={closeShowMypageModal} id="App">
        {/* 로그인을 하면  로그인이 사라지고 마이페이지가 생겨야한다. */}
        <Routes>
          {/* 메인헤더는 구독 등록과, 구독 모음 등록 할시에는 보이지않아야 한다. */}
          <Route element={<Mainheader />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route
              path="/mypage/*"
              element={<Navigate replace to="/mypage" />}
            />
          </Route>

          <Route element={<MainHeaderLogo />}>
            <Route path="/login" element={<SigninPage></SigninPage>} />
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
