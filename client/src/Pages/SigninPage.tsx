import Login from "Components/Login/Login";
import OauthLoignBtn from "Components/Login/OauthLoginBtn";
import UserSignupBtn from "Components/Login/UserSignupBtn";
import React, { useState } from "react";


// type signInfo = {

//   handleSignin :() =>void
//   signinErrMessage:string;
// }

import '../css/pages/SigninPage.css'

const SigninPage= () => {
  //이메일 회원가입을 누르면 signup으로 이동
  //signup은 회원가입창
  
  return (
    <div id= "SigninPage">

      <Login  ></Login>
      <UserSignupBtn></UserSignupBtn>
      <OauthLoignBtn></OauthLoignBtn>
     
    </div>
  );
};

export default SigninPage;
