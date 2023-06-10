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
  walletPageCostUseStore,
} from "utils/state";
import { useStore } from "Components/Login/Login";
import ErrModal from "Components/Modal/errorModal";
import CallbackPage from "Pages/CallbackPage";
import { stringify } from "querystring";
import Loading from "Components/Common/loading";
import NoticeBoardManage from "Pages/BoardManage";
import BottomBar from "Components/Common/footer";
import MenuBar from "Components/Common/menuBar";
import AlarmPage from "Pages/AlarmPage";
import ShareEditPage from "Pages/Mypage/ShareEditPage";
import SubDetailModal from "Components/Modal/subDetailModal";

// import useAxiosInterceptors from "utils/Intercepts";
// import { requestInstance, responseInstance } from "utils/Intercepts";
// import axios from "utils/Intercepts";
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

// const localstorageUserInfo = JSON.parse(
//   localStorage.getItem("subgatherUserInfo") || "{}"
// );
// const { persistLogin } = isSigninState();

const today: number = Math.floor(Date.now() / 1000);

const cancelTokenSource = axios.CancelToken.source();

export const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URI}`,
  timeout: 500,
  cancelToken: cancelTokenSource.token,
});

const accessToken: string | null = localStorage.getItem("accessToken");

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
  const { setWalletPayment, setWalletSubCost, walletPayment, walletSubCost } =
  walletPageCostUseStore()
  const url = new URL(window.location.href);
  const searchs = url.search;

  const navigate = useNavigate();

  // 로딩은 로그인할때만 작동하도록
  const { page } = paginationuseStore();

  const limit = 6;
  const offset = page * limit;

  const { setAlarmInfo } = alarmInfouseStore();
  const { userSignin } = isSigninState();

  // 로그인했을때만 로딩 하도록한다.

  //!

  // axiInstance

  //토큰이 만료되면 로그아웃이 되는데, 로그아웃 모달창이 뜨면서,
  const { showErrModal } = showErrModalState();
  const{showSubDetail,setShowSubDetail,setShowSubEdit} = useWalletStore()

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
  // const accessToken: string | null = localStorage.getItem("accessToken");

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const { persistLogin } = isSigninState();
  const today: number = Math.floor(Date.now() / 1000);

  console.log(localstorageUserInfo.accessExp - today);

  const requestInstance: any = instance.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
      const accessToken: string | null = localStorage.getItem("accessToken");

      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      if (!accessToken) {
        if (config.url === "/alarm/info") {
          instance.interceptors.request.eject(requestInstance);
          instance.interceptors.response.eject(responseInstance);
          return;
        }
      }

      if (accessToken) {
        // accessToken이 있는 경우, 요청 헤더에 추가합니다.

        if (config.url === "/auth/signout") {
          instance.interceptors.request.eject(requestInstance);
          instance.interceptors.response.eject(responseInstance);
          return config;
        }
      }

      return config;
    },
    async (error) => {
      return Promise.reject(error);
    }
  );

  if (localstorageUserInfo.accessExp < today) {
    //만료가 된경우
  }

  const responseInstance = instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // console.log(
      //   originalRequest._retry,
      //   localstorageUserInfo.accessExp < today
      // );

      if (!originalRequest._retry && localstorageUserInfo.accessExp < today) {
        originalRequest._retry = true;

        return axios
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
            console.log("일로와");
            localStorage.setItem("accessToken", res.data.accessToken);
            //         //res.data
            localStorage.setItem(
              "subgatherUserInfo",
              JSON.stringify(res.data.data)
            );

            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.accessToken}`;

            return instance(originalRequest);
            // return axios.request(originalRequest);

            //  axios.request(originalRequest);

            // setTokenExpired(result.accessToken);
            // return instance(originalRequest);

            //다시 요청
          })
          .catch((err) => {
            //refreshToken이 만료가된경우 로그아웃을 한다 -> 만료

            axios
              .get(`${process.env.REACT_APP_API_URI}/auth/signout`, {
                headers: {
                  authorization: `Bearer ${accessToken}`,
                },
              })

              .then((res) => {
                //리프레쉬 토큰이 없는경우 로그아웃을 해야한다.
                // window.location.replace("/");

                persistLogin(false);

                window.location.href = "/login";

                window.alert("로그인이 만료되었습니다. 다시 로그인해주세요");
                localStorage.clear();
                isSigninState.persist.clearStorage();

                // cancelTokenSource.cancel();
                // return Promise.reject(error);
              })
              .catch((err) => {
                console.error(err);

                persistLogin(false);
                // showMypageModalOn(false);

                localStorage.removeItem("accessToken");
                isSigninState.persist.clearStorage();
                localStorage.removeItem("subgatherUserInfo");
              });
          });
      }
      // }

      //에러로 내보낸다.
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("실행");
        // const s = await sos.get('/')
        const response = await instance.get("/alarm/info");

        setAlarmInfo(response.data.data);
      } catch (error) {
        console.log("실패");
        // console.log(error);
      }
    };
    fetchData();

    return () => {
      axios.interceptors.request.eject(requestInstance);
      axios.interceptors.response.eject(responseInstance);
    };
  }, [userSignin]);



  useEffect(() => {

    showMypageModalOn(false);
    mobileMyPageOn(false)
    setShowAlarmModal(false)
    setShowSubDetail(false)
    setShowSubEdit(false)

  }, [navigate]);

  const closeModlaClickHeader = () =>{
    showMypageModalOn(false);
    mobileMyPageOn(false)
    setShowAlarmModal(false)
    setShowSubDetail(false)
    setShowSubEdit(false)
  }



  useEffect(() => {
    instance
      .get(`/wallet/payment`, {})
      .then((res) => {

        
     
        setWalletSubCost(res.data.payment)
        setWalletPayment(res.data.cost);
      })
      .catch((err) => {
        console.log(err);
      });



  }, []);


  // useEffect(()=>{


  // },[mobileMyPage])

  //만약 토큰이 만료가 됐고

  // useEffect(() => {

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
        <Route path="/calendar" element={<CalendarPage />} />

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
        <Route
          path="/shareedit"
          element={<ShareEditPage></ShareEditPage>}
        ></Route>

        <Route path="/" element={<MainPage></MainPage>}></Route>
      </Routes>
    </div>
  );
};

export default App;
