import Login, { useStore } from "Components/Login/Login";
import OauthLoignBtn from "Components/Login/OauthLoginBtn";
import UserSignupBtn from "Components/Login/UserSignupBtn";
import React, { useEffect, useState } from "react";




// type signInfo = {

//   handleSignin :() =>void
//   signinErrMessage:string;
// }

import '../css/pages/SigninPage.css'

const SigninPage= () => {
 


  
  return (
    <div id= "SigninPage">

      <Login  ></Login>
      <UserSignupBtn></UserSignupBtn>
      <OauthLoignBtn></OauthLoignBtn>

    </div>
  );
};

export default SigninPage;
