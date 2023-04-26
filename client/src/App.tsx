import React, { useState, useEffect } from "react";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import moment from "moment";
import "./css/reset.css";
import {
  Route,
  Navigate,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

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
import {
  alarmInfouseStore,
  isSigninState,
  mainheaderuseStore,
  paginationuseStore,
  showErrModalState,
  useWalletStore,
} from "utils/state";
import { useStore } from "Components/Login/Login";
import ErrModal from "Components/Modal/errorModal";
import CallbackPage from "Pages/CallbackPage";
import { stringify } from "querystring";
import Loading from "Components/Common/loading";
import NoticeBoardManage from "Pages/NoticeBoardManage";
import BottomBar from "Components/Common/footer";
import MenuBar from "Components/Common/menuBar";
import AlarmPage from "Pages/AlarmPage";
// import { requestInstance, responseInstance } from "utils/Intercepts";

// import instance from "utils/Intercepts";

// import {
//   MainPage,
//   WalletPage,
//   SharePage,
//   UserPage,
//   CallendarPage,
// } from 'Pages'

// type appState = {
//   timeIsNow: number;
//   setTimeIsNow: (input: number) => void;
// };

const cancelTokenSource = axios.CancelToken.source();

export const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
  timeout: 500,
  cancelToken: cancelTokenSource.token,
});

// export const appUseStore = create<appState>()((set) => ({
//   timeIsNow: Math.floor(Date.now() / 1000),
//   setTimeIsNow: (input: number) => set({ timeIsNow: input }),
// }));
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

const App = () => {
  // const navigate = useNavigate();
  // const navigate = useNavigate()
  //!
  const url = new URL(window.location.href);
  const searchs = url.search;

  const navigate = useNavigate();

  // 로딩은 로그인할때만 작동하도록
  const { page } = paginationuseStore();

  const limit = 6;
  const offset = page * limit;

  const { walletInfo, setWalletInfo } = useWalletStore();
  const { setAlarmInfo } = alarmInfouseStore();
  const { userSignin } = isSigninState();

  // 로그인했을때만 로딩 하도록한다.

  //!

  //토큰이 만료되면 로그아웃이 되는데, 로그아웃 모달창이 뜨면서,
  const { showErrModal } = showErrModalState();

  const {
    showMypageModal,
    showNumber,
    mobileMyPageOn,
    mobileMyPage,
    showAlarmPage,
    infoNumber,
    setShowNumber,
    showMypageModalOn,
    setShowAlarmModal,
    setShowAlarmPage,
  } = mainheaderuseStore();

  const closeShowMypageModal = () => {
    showMypageModalOn(false);
    mobileMyPageOn(false);
  };

  const closeMenuBar = () => {
    mobileMyPageOn(false);
  };

  {
    /* <Route path={ROUTES.CALLBACK} element={<IsUserRedirect />}>
<Route path="/oauth/:corp" element={<Callback />} /> */
  }

  const {
    mypageOn,
    mypageState,
    tokenExpiration,
    tokenExpired,
    setTokenExpiration,
    setTokenExpired,
  } = useStore();

  //오늘 time이 accessExp 만료되기전에 해야하니깐 60초? 60초 미리 확인해서 로그인하도록 한다
  //다시 refresh token이 만료되는 경우 에만 작동되어야 한다. refresh가 없으면 로그아웃이 되는데
  // 로그아웃인경우는 작동하지 않는다.
  const accessToken: string | null = localStorage.getItem("accessToken");

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const { persistLogin } = isSigninState();
  const today: number = Math.floor(Date.now() / 1000);

  console.log(localstorageUserInfo.accessExp - today);
  //  const instanceRequest =
  // requestInstance;
  // responseInstance;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const s = await sos.get('/')
        const response = await instance.get("/alarm/info");

        setAlarmInfo(response.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     axios.interceptors.request.eject(requestInstance);
  //     axios.interceptors.response.eject(responseInstance);
  //   };
  // }, []);

  return (
    <div onClick={closeShowMypageModal} id="App">
      {showErrModal ? <ErrModal></ErrModal> : null}
      {mobileMyPage ? <MenuBar></MenuBar> : null}
      {showAlarmPage ? <AlarmPage></AlarmPage> : null}

      {/* 로그인을 하면  로그인이 사라지고 마이페이지가 생겨야한다. */}
      <Routes>
        {/* 메인헤더는 구독 등록과, 구독 모음 등록 할시에는 보이지않아야 한다. */}
        <Route element={<Mainheader />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route
            path="/noticeBoard"
            element={<NoticeBoardManage></NoticeBoardManage>}
          />
          <Route path="/mypage/*" element={<Navigate replace to="/mypage" />} />

          <Route path={`/share`} element={<SharePage></SharePage>} />
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
          path="/callback/:auth"
          element={<CallbackPage></CallbackPage>}
        ></Route>
        <Route
          path="/calendarselect"
          element={<CalendarSelect></CalendarSelect>}
        ></Route>

        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </div>
  );
};

export default App;
