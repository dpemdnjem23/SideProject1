import CancellationButton from "Components/Common/cancellationButoon";
import RegistButton from "Components/Common/registButton";
import SubRegistInfo from "Components/Mypage/mypagesub/subregistInfo";
import SubRegistPeriod from "Components/Mypage/mypagesub/subregistPeriod";
import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isSigninState, showDropDownList } from "utils/state";

import "../../css/pages/SubRegisterPage.css";

const SubRegisterPage = () => {
  const { setDropDownOpen, dropDownOpen } = showDropDownList();

  const closeToggling = () => {
    setDropDownOpen(false);
  };

  const { persistLogin, userSignin } = isSigninState();

  const accessToken: string | null = localStorage.getItem("accessToken");

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || "{}"
  );
  const today: number = Math.floor(Date.now() / 1000);

  useEffect(() => {
    if (userinfo.accessExp < today) {
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
              persistLogin(false);

              window.location.href = "/login";

              window.alert("로그인이 만료되었습니다. 다시 로그인해주세요");
              localStorage.clear();
              isSigninState.persist.clearStorage();
            })
            .catch((err) => {
              console.error(err);

              persistLogin(false);

              localStorage.removeItem("accessToken");
              isSigninState.persist.clearStorage();
              localStorage.removeItem("subgatherUserInfo");
            });
        });
    }
  }, []);

  //구독 지갑에 구독 등록하기 => 구독정보, 가격 , 싸이클, 구독시작날짜를
  //입력받아서 axios (서버) 로 넘겨준다. regist button 클릭시 적용되도록

  return (
    <div onClick={closeToggling} id="RegisterPage">
      <SubRegistInfo />

      <SubRegistPeriod />
      <div className="RegisterPage_bt">
        <CancellationButton />
        <RegistButton />
      </div>
    </div>
  );
};

export default SubRegisterPage;
