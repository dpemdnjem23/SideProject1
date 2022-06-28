import axios from "axios";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import React, { useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

import "../../css/components/Login/Login.css";

type SigninInfo = {
  username: string;
  password: string;
};
type mypageState = {
  getStorage: () => void;
  name: string;
  userSignin: boolean;

  // mypageOn: (input: boolean) => void;
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

export const useStore = create(
  persist(
    (set, get) => ({
      userSignin: false,
      mypageOn: (input: boolean) => set({ userSignin: input }),
    }),
    {
      name: "isSign-storage",
      getStorage: () => localStorage,
    }
  )
);

// type signInfo = {
//   handleSignin: () => void;
//   signinErrMessage:string;
// };
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] =  'Bearer token'
axios.defaults.headers.post["Content-Type"] = "application/json";

const Login = () => {
  const [signinInfo, setSigninInfo] = useState<SigninInfo>({
    username: "",
    password: "",
  });

  const navigate: NavigateFunction = useNavigate();
  const [signinErrMessage, setSigninErrMessage] = useState<string>("");

  const { mypageOn }: any = useStore();

  // const disalbedHandle = (disabled: boolean) => mypageOn(disabled);

  const handleSignInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "signin-user") {
      setSigninInfo({ ...signinInfo, username: e.target.value });
    }
    if (e.target.id === "signin-password") {
      setSigninInfo({ ...signinInfo, password: e.target.value });
    }
  };

  //로그인을 누르면 db랑 id 매칭해서 확인되면 통과, 메인, 토큰 받기
  // a
  //토큰이 존재한다면 로그인 상태를 갱신하지 않아야 한다.

  const handleSignin = () => {
    if (!signinInfo.username&&signinInfo.password) {
      setSigninErrMessage("아이디를 입력해주세요");
    } else if (signinInfo.username&&!signinInfo.password) {
      setSigninErrMessage("비밀번호를 입력해주세요");
    } else if (!signinInfo.username&&!signinInfo.password) {
      setSigninErrMessage("아이디와 비밀번호를 입력해주세요.");
    }
     else if (signinInfo.password && signinInfo.username) {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/signin`, {
          username: signinInfo.username,
          password: signinInfo.password,
        })
        .then((res) => {
          // localStorage.setItem("accessToken", res.data.accessToken);
          console.log(res);

          mypageOn(true);

          //  console.log(mypageOn(disabled) )

          navigate("/");
        })
        .catch((err) => {
          // mypageOff()

          // mypageOn(false);

          setSigninErrMessage("아이디와 비밀번호를 정확히 입력해주세요");
          //로그인 정보가 맞지 않는경우. errmessage
          throw err;
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
