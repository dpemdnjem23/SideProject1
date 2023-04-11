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

export const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
  timeout: 500,
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

  //!
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
  instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const accessToken: string | null = localStorage.getItem("accessToken");

      // console.log('성공')
      if (accessToken) {
        // accessToken이 있는 경우, 요청 헤더에 추가합니다.
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };
      }
      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // if (!originalRequest._retry) {
      if (
        !originalRequest._retry &&
        localstorageUserInfo.accessExp < today &&
        userSignin
      ) {
        axios
          .post(
            `${process.env.REACT_APP_API_URI}/auth/issueaccess`,
            {
              id: localstorageUserInfo.id,
            },
            {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log("항상 먼저 실행");

            localStorage.setItem("accessToken", res.data.accessToken);
            //         //res.data
            localStorage.setItem(
              "subgatherUserInfo",
              JSON.stringify(res.data.data)
            );

            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;

            //  axios.request(originalRequest);

            // setTokenExpired(result.accessToken);
          })
          .catch((err) => {
            //refreshToken이 만료가된경우 로그아웃을 한다 -> 만료
            originalRequest._retry = true;

            fetch(`${process.env.REACT_APP_API_URI}/auth/signout`, {
              method: "get",
              credentials: "include",
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })
              .then((res: any) => {
                if (!res.ok) {
                  persistLogin(false);
                  showMypageModalOn(false);

                  localStorage.removeItem("accessToken");
                  isSigninState.persist.clearStorage();
                  localStorage.removeItem("subgatherUserInfo");

                  throw new Error(res.status);
                  // window.location.reload()
                }
                return res.text();
                //       // window.location.reload();
              })
              .then((res) => {
                originalRequest._retry = true;
                console.log(originalRequest._retry);

                //리프레쉬 토큰이 없는경우 로그아웃을 해야한다.

                persistLogin(false);

                console.log(userSignin);

                alert("로그인이 만료되었습니다. 다시 로그인해주세요");

                // localStorage.clear();
                // isSigninState.persist.clearStorage();

                // navigate("/");

                // window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        // return axios.request(originalRequest)

        //다시 요청
        return instance(originalRequest);
      }
      // }

      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const s = await sos.get('/')
        const response = await instance.get("/alarm/info");

        setAlarmInfo(response.data.data);
      } catch (error) {
        // console.error("error");
      }
    };
    fetchData();
  }, [userSignin]);

  // useEffect(() => {
  //   if (localstorageUserInfo.accessExp < today) {
  //     fetch(`${process.env.REACT_APP_API_URI}/auth/issueaccess`, {
  //       body: JSON.stringify({
  //         id: localstorageUserInfo.id,
  //       }),
  //       method: "post",
  //       headers: {
  //         authorization: `Bearer ${accessToken}`,
  //       },
  //       credentials: "include",
  //     })
  //       .then((res: any) => {
  //         if (!res.ok) {
  //           //accesstoken을 보냈더니 refreshk 가만료면 로그아웃을 한다.
  //           persistLogin(false);

  //           localStorage.removeItem("accessToken");
  //           // alert("로그인이 만료되었습니다. 다시 로그인해주세요");
  //           isSigninState.persist.clearStorage();
  //           localStorage.removeItem("subgatherUserInfo");
  //           window.location.assign("/");

  //           throw new Error(res.status);
  //         }

  //         return res.json();
  //       })
  //       .then((result) => {
  //         //accesstoken을 보냈더니 기간만료 전이야 그러면 재발급
  //         localStorage.setItem("accessToken", result.accessToken);
  //         //res.data
  //         localStorage.setItem(
  //           "subgatherUserInfo",
  //           JSON.stringify(result.data)
  //         );
  //         // setTokenExpired(result.accessToken);
  //       })
  //       .catch((err) => {
  //         //accessToken 을 보냈을때 기간만료인경우 로그아웃        // setUserSi
  //       });
  //   }
  // }, []);

  //2*60*60*1000

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URI}/alarm/info`, {
  //       headers: {
  //         authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAlarmInfo(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [tokenExpired]);

  // useEffect(()=>{

  // },[])
  //1. 새로고침, 이동할때마다 통신을 하여 리프레쉬 토큰이 만료된경우 -> 로그아웃
  //2. 만약 액세스 토큰이 만료된경우라면 만료되기전에 다시 access를 재발급 한다.

  //1. 리프레쉬 토큰은 쿠키에 존재한다.
  //2. 액세스 토큰이 만료되면 리프레쉬 토큰으로 액세스 토큰 재발급
  //3.
  // console.log(document.cookie.match('refreshToken'))
  //

  // const instance: any= axios.create({
  //   baseURL: `${process.env.REACT_APP_API_URI}`,
  //   timeout: 5000,
  //   headers: {
  //     "Content-type": "application/json",
  //     authorization: `Bearer ${accessToken}`,
  //   },
  // });

  //axios interceptor를 사용하여 요청전에 accesstoken

  return (
    <BrowserRouter>
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
              path="noticeBoard"
              element={<NoticeBoardManage></NoticeBoardManage>}
            />
            <Route
              path="/mypage/*"
              element={<Navigate replace to="/mypage" />}
            />

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
    </BrowserRouter>
  );
};

export default App;
