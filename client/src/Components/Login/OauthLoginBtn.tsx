import axios from "axios";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { googleOauth, kakaoOauth } from "utils/Oauth";
import { isSigninState } from "utils/state";



import '../../css/components/Login/OauthLoginBtn.css'
const OauthLoignBtn = () => {

 

const handlekakaoLogin = () =>{

  window.location.assign(kakaoOauth)
}

const handlegoogleLogin = () =>{


  window.location.assign(googleOauth)

} 

//widnows를 통해 코드를 받아서 사용한다.

  
  return (
    <div className = 'Oauth_sign_section'>
      <div onClick={handlegoogleLogin} className="google_login bt">
        <div className="google_login ic">
          <img src="./images/googlelogo.png"></img>
        </div>

        <span className="google_login text">Google로 시작하기</span>
      </div>

      {/* <> */}
      <div onClick = {handlekakaoLogin} className="kakao_login bt">

    

        <div className="kakao_login ic">
            
          <img width="40" src="./images/kakaologo.png"></img>
     
        </div>
        <span className="kakao_login text">카카오로 시작하기</span>
       
      </div>
     {/* </> */}
    </div>
  );
};

export default OauthLoignBtn;
