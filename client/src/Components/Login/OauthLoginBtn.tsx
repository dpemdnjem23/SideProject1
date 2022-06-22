import React from "react";


import '../../css/components/Login/OauthLoginBtn.css'
const OauthLoignBtn = () => {
  return (
    <div className = 'Oauth_sign_section'>
      <div className="google_login bt">
        <div className="google_login ic">
          <img src="./images/googlelogo.png"></img>
        </div>
        <span className="google_login text">Google로 시작하기</span>
      </div>
      <div className="kakao_login bt">
        <div className="kakao_login ic">
          <img width="40" src="./images/kakaologo.png"></img>
        </div>
        <span className="kakao_login text">카카오로 시작하기</span>
      </div>
    </div>
  );
};

export default OauthLoignBtn;
