import AlarmMain from "Components/Alarm/alarmMain";
import AlarmTop from "Components/Alarm/alarmTop";
import React, { useState, useEffect } from "react";
import { isSigninState, mainheaderuseStore } from "utils/state";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";

import "../css/pages/AlarmPage.css";
const AlarmPage = () => {
  const [pageScroll, setPageScroll] = useState<boolean>(true);

  const { showAlarmModal } = mainheaderuseStore();

  //alarmModal이 존재할때만

  const accessToken: string | null = localStorage.getItem("accessToken");

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );

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
      console.log("일로와");
      localStorage.setItem("accessToken", res.data.accessToken);
      //         //res.data
      localStorage.setItem("subgatherUserInfo", JSON.stringify(res.data.data));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.accessToken}`;

      const { userSignin,persistLogin } = isSigninState()


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

  useEffect(() => {
    // if (showAlarmModal) {
    console.log(showAlarmModal, pageScroll);

    const mediaQuery = window.matchMedia("(max-width:768px)");

    const listener = (e: MediaQueryListEvent) => {
      setPageScroll(e.matches);
    };

    mediaQuery.addEventListener("change", listener);

    if (pageScroll) {
      document.body.style.overflowY = "scroll";
      document.body.style.top = "0";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflowY = "";
      document.body.style.top = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
    // }
  }, []);

  return (
    <div id="AlarmPage">
      <AlarmTop></AlarmTop>
      <AlarmMain></AlarmMain>
    </div>
  );
};
export default AlarmPage;
