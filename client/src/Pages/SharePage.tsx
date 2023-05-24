import SharePagiNation from "Components/Share/pagiNation";
import PagiNation from "Components/Share/pagiNation";
import ShareCard from "Components/Share/sharePageCard";
import React, { useState, useEffect } from "react";
import Loading from "Components/Common/loading";
import {
  isSigninState,
  paginationuseStore,
  shareCarduseStore,
} from "utils/state";
import moment from "moment";
import "../css/pages/SharePage.css";
import CardModal from "Components/Modal/cardModal";
import axios from "axios";
const SharePage = () => {
  const {
    setShareInfo,
    setLoading,
    shareInfo,
    setCardIndex,
    setClickModalNum,
    setCardModal,
    loading,
    cardModal,
  } = shareCarduseStore();

  const today: number = Math.floor(Date.now() / 1000);

  //sharepage에서 로그인이 되어있는경우 access가 없다면, 재발급하고
  //access재발급중 refresh가 없다면 refresh
  //
  const accessToken: string | null = localStorage.getItem("accessToken");

  //로그아웃을 하도록 한다.

  const localstorageUserInfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const { persistLogin, userSignin } = isSigninState();

  //재발급 하는경우,  발동조건

  useEffect(() => {
    if (localstorageUserInfo.accessExp < today && userSignin) {
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
          localStorage.setItem("accessToken", res.data.accessToken);
          //         //res.data
          localStorage.setItem(
            "subgatherUserInfo",
            JSON.stringify(res.data.data)
          );

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.accessToken}`;

          // return axios.request(originalRequest);

          //  axios.request(originalRequest);

          // setTokenExpired(result.accessToken);
          // return instance(originalRequest);

          //다시 요청
        })
        .catch(() => {
          //refreshToken이 만료가된경우 로그아웃을 한다 -> 만료

          return axios
            .get(`${process.env.REACT_APP_API_URI}/auth/signout`, {
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            })

            .then((res) => {
              //리프레쉬 토큰이 없는경우 로그아웃을 해야한다.
              // window.location.replace("/");

              persistLogin(false);
              window.alert("로그인이 만료되었습니다. 다시 로그인해주세요");

              window.location.href = "/login";

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
  },[]);

  // onClick={(e) => e.stopPropagation()}

  //  const [loading, setLoading] =useState(true)

  // background-color: rgb(247, 249, 250);
  return (
    <div id="sharePage">
      <div onClick={(e) => e.stopPropagation()} className="sharePage_section">
        {/* <> */}
        {cardModal ? <CardModal></CardModal> : null}

        <div className="sharePage_text">
          <h1>구독공유</h1>
          <p>서로에게 우리가 가진 구독을 소개해보아요.</p>
        </div>
        <ShareCard></ShareCard>
        <SharePagiNation></SharePagiNation>
      </div>
    </div>
  );
};

export default SharePage;
