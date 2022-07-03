import Login, { useStore } from "Components/Login/Login";
import OauthLoignBtn from "Components/Login/OauthLoginBtn";
import UserSignupBtn from "Components/Login/UserSignupBtn";
import React, { useEffect, useState } from "react";

// type signInfo = {

//   handleSignin :() =>void
//   signinErrMessage:string;
// }

import "../css/pages/SigninPage.css";

const SigninPage = () => {

  //로그인 페이지에서 로 Oauth를 누르는경우
 

  return (
    <div id="SigninPage">
      <Login></Login>
      <UserSignupBtn></UserSignupBtn>
      <OauthLoignBtn></OauthLoignBtn>
    </div>
  );
};

export default SigninPage;
