import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router";

import "../../css/components/Login/Login.css";

type SigninInfo = {
  username: string;
  password: string;
};
axios.defaults.withCredentials=true;
// axios.defaults.headers.common['Authorization'] =  'Bearer token'
axios.defaults.headers.post["Content-Type"] = "application/json";
const Login = () => {


  const [signinInfo, setSigninInfo] = useState<SigninInfo>({
    username: "",
    password: "",
  });
  const [disabledSignin,setDisabledSignin] = useState<boolean>(false)

  const [signinErrMessage,setSigninErrMessagae] =useState<string>('')
  const navigate = useNavigate()


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
    axios.post(`${process.env.REACT_APP_API_URI}/auth/signin`, {
      username:signinInfo.username,
      password:signinInfo.password
    }).then((res)=>{
      // localStorage.setItem

      console.log(res)
      setDisabledSignin(true);
      navigate('/')

    }).catch((err)=>{
      setDisabledSignin(false);
      setSigninErrMessagae('아이디와 비밀번호를 정확히 입력해주세요')
      console.log(err)
      //로그인 정보가 맞지 않는경우. errmessage
      throw err
    })
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
          <div onClick = {handleSignin}className="login_bt">
            <span className="login_bt_text">로그인</span>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
