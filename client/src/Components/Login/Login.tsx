import axios from "axios";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import React, { useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

import "../../css/components/Login/Login.css";
import { isSigninState } from "utils/state";
import { appUseStore } from "App";

type SigninInfo = {
  username: string;
  password: string;
};
type mypageState = {
  mypageState: boolean;
  tokenExpired: string | null;
  tokenExpiration: number;
  setTokenExpiration: (input: number) => void;

  setTokenExpired: (input: string | null) => void;

  mypageOn: (input: boolean) => void;
};

// export const usStore = create(persist(
//   (set, get) => ({
//     fishes: 0,
//     addAFish: () => set({ fishes: get().fishes + 1 })
//   }),
//   {
//     name: "food-storage", // unique name
//     getStorage: () => AsyncStorage, // Add this here!
//   }
// ))

export const useStore = create<mypageState>()((set) => ({
  mypageState: false,
  tokenExpired: null,
  tokenExpiration: 0,
  setTokenExpiration: (input) => set({ tokenExpiration: input }),

  setTokenExpired: (input) => set({ tokenExpired: input }),

  mypageOn: (input) => set({ mypageState: input }),
}));

// type signInfo = {
//   handleSignin: () => void;
//   signinErrMessage:string;

const Login = () => {
  const { setTimeIsNow, timeIsNow } = appUseStore();

  const {
    mypageOn,
    mypageState,
    tokenExpiration,
    tokenExpired,
    setTokenExpiration,
    setTokenExpired,
  } = useStore();
  const [signinInfo, setSigninInfo] = useState<SigninInfo>({
    username: "",
    password: "",
  });

  // userSignin=false
  const navigate: NavigateFunction = useNavigate();
  const [signinErrMessage, setSigninErrMessage] = useState<string>("");

  // const disalbedHandle = (disabled: boolean) => mypageOn(disabled);

  const handleSignInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "signin-user") {
      setSigninInfo({ ...signinInfo, username: e.target.value });
    }
    if (e.target.id === "signin-password") {
      setSigninInfo({ ...signinInfo, password: e.target.value });
    }
  };

  const { persistLogin } = isSigninState();

  //로그인을 누르면 db랑 id 매칭해서 확인되면 통과, 메인, 토큰 받기
  // a
  //토큰이 존재한다면 로그인 상태를 갱신하지 않아야 한다.

  const handleSignin = () => {
    if (!signinInfo.username && signinInfo.password) {
      setSigninErrMessage("아이디를 입력해주세요");
    } else if (signinInfo.username && !signinInfo.password) {
      setSigninErrMessage("비밀번호를 입력해주세요");
    } else if (!signinInfo.username && !signinInfo.password) {
      setSigninErrMessage("아이디와 비밀번호를 입력해주세요.");
    } else if (signinInfo.password && signinInfo.username) {
      fetch(`${process.env.REACT_APP_API_URI}/auth/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json ",
        },
        credentials: "include",

        body: JSON.stringify({
          username: signinInfo.username,
          password: signinInfo.password,
        }),
      })
        .then((res: any) => {
          if (!res.ok) {
            mypageOn(false);
            setSigninInfo({ ...signinInfo, password: "" });

            setSigninErrMessage("아이디와 비밀번호를 정확히 입력해주세요");

            throw new Error(res.status);
          }
          return res.json();
        })
        .then((res) => {
          // navigate("/");

  
          localStorage.setItem("accessToken", res.accessToken);

          localStorage.setItem("subgatherUserInfo", JSON.stringify(res.data));
          setTokenExpiration(res.data.accessExp);
          // setTokenExpired(res.accessToken);
          persistLogin(true);
          navigate('/')

          // clearTimeout(tokenTimer)

          //로그인을하는순간 setTimeOut 시작 하고

          // console.log(res)
        })
        .catch((err) => {
          mypageOn(false);
          setSigninInfo({ ...signinInfo, password: "" });

          setSigninErrMessage("아이디와 비밀번호를 정확히 입력해주세요");
          // mypageOff()

          console.log(err);

          //로그인 정보가 맞지 않는경우. errmessage
        });
    }
  };

  return (
    <div className="login">
      <header>
        <div className="login_title">간편가입 / 로그인</div>
        <div className="login_title_desc">
          내가 무엇을 구독했는지 관리해보세요!
        </div>
      </header>

      <div className="login_section_input">
        <input
          value={signinInfo.username}
          id="signin-user"
          onChange={handleSignInfo}
          type="text"
          placeholder="아이디"
        ></input>
        <input
          onChange={handleSignInfo}
          value={signinInfo.password}
          id="signin-password"
          type="password"
          placeholder="비밀번호(문자,숫자포함 8자 이상)"
        ></input>
        <span>{signinErrMessage}</span>
        <div onClick={() => handleSignin()} className="login_bt">
          <span className="login_bt_text">로그인</span>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
