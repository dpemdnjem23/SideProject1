import React, { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faBell,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import create from "zustand";
import "../../css/common/modal/MypageModal.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "Components/Login/Login";
import { isSigninState, mainheaderuseStore } from "utils/state";
// import instance from "utils/Intercepts";
import { instance } from "App";
//로그아웃을 누르면 로그아웃이 되면서 로그인 해제
axios.defaults.withCredentials = true;
axios.defaults.headers.get["Content-Type"] = "application/json";

//모달 닫기버튼은 app.js로 넘기고싶다.

//로그아웃을 하면 쿠키제거, 로컬스토리지 제거 새로고침
const MypageModal = () => {

  const accessToken: string | null = localStorage.getItem("accessToken");

  const navigate = useNavigate();
  const { showMypageModalOn } = mainheaderuseStore();

  const { persistLogin, userSignin } = isSigninState();
  const today: number = Math.floor(Date.now() / 1000);
  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

  const refreshTokenLogOut = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URI}/auth/issueaccess`,
        {
          id: userinfo.id,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        //         //res.data
        localStorage.setItem(
          "subgatherUserInfo",
          JSON.stringify(res.data.data)
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;


      })
      .catch((err) => {
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
  };

  const handleSignout = () => {
    if (accessToken) {
      instance
        .get("/auth/signout")
        .then((res) => {
          persistLogin(false);
          showMypageModalOn(false);
          localStorage.clear();

          console.log(userSignin);
          isSigninState.persist.clearStorage();

          navigate("/");

          // window.location.reload();
        })
        .catch((err) => {
          persistLogin(false);
          showMypageModalOn(false);

          localStorage.removeItem("accessToken");
          isSigninState.persist.clearStorage();
          localStorage.removeItem("subgatherUserInfo");

          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (userinfo.accessExp < today) {
      refreshTokenLogOut();

      //만료가 된경우
    }
  }, []);

  return (
    <div id="MypageModal">
      <div className="MypageModal_section">
        <img width="50" src="./images/wallet-6551548.svg" />
        <div className="MypageModal_section_textarea">
          <span>{userinfo.nickname} 님의</span>
          <br></br>
          <Link onClick={() => showMypageModalOn(false)} to="/mypage">
            <div>
              마이페이지 <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </Link>
        </div>
      </div>
      <div className="MypageModal_line"></div>

      <div onClick={handleSignout} className="MypageModal_section">
        <div>로그아웃</div>
      </div>
    </div>
  );
};

export default MypageModal;
