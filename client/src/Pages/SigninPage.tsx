import Login from "Components/login/Login";
import LoginBtn from "Components/login/LoginBtn";
import OauthLoignBtn from "Components/login/OauthLoginBtn";
import SignupBtn from "Components/login/SignupBtn";
import React, { useState } from "react";





const SigninPage= () => {
  //이메일 회원가입을 누르면 signup으로 이동
  //signup은 회원가입창
  
  return (
    <div>

      <Login></Login>
      <LoginBtn></LoginBtn>
      <SignupBtn></SignupBtn>
      <OauthLoignBtn></OauthLoignBtn>
     
    </div>
  );
};

export default SigninPage;
