import axios from "axios";
import create from "zustand";
import { persist, devtools } from "zustand/middleware";

import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

import "../../css/components/Login/Login.css";
import { STATES } from "mongoose";

type SigninInfo = {
  username: string;
  password: string;
};
type mypageState = {
  disabledSignin: boolean;
  mypageOff: () => void;

  mypageOn: (input: boolean) => void;
};

// type signInfo = {
//   handleSignin: () => void;
//   signinErrMessage:string;
// };
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] =  'Bearer token'
axios.defaults.headers.post["Content-Type"] = "application/json";

export const useStore = create<mypageState>()(
  devtools((set) => ({
    disabledSignin: false,
    mypageOn(input) {
      set(() => ({ disabledSignin: input }));
    },
    mypageOff() {
      set(() => ({ disabledSignin: false }));
    },
  }))
);

const Login = () => {
  const [signinInfo, setSigninInfo] = useState<SigninInfo>({
    username: "",
    password: "",
  });

  const navigate: NavigateFunction = useNavigate();
  const [signinErrMessage, setSigninErrMessagae] = useState<string>("");

  const { disabledSignin, mypageOn }: any = useStore();
  const [disabled, setDisabled] = useState<boolean>(true);

  const disalbedHandle = (disabled: boolean) => mypageOn(disabled);

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

  const handleSignin = () => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/auth/signin`, {
        username: signinInfo.username,
        password: signinInfo.password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);

        setDisabled(true);
        disalbedHandle;

        //  console.log(mypageOn(disabled) )

        navigate("/");
      })
      .catch((err) => {
        // mypageOff()
        setDisabled(false);
        disalbedHandle;

        setSigninErrMessagae("아이디와 비밀번호를 정확히 입력해주세요");
        //로그인 정보가 맞지 않는경우. errmessage
        throw err;
      });
  };

  useEffect(() => {
    handleSignin
  }, []);
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
        {disabledSignin}
        <input
          onClick={() => mypageOn(disabled)}
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
