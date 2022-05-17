import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";
import SignupModal from "./signupModal";

const SigninModal= ({ openSignupModal ,setShowModal }:any) => {
  //이메일 회원가입을 누르면 signup으로 이동
  //signup은 회원가입창
  
  // const [signupModal, setSignupModal] = useState<boolean>(false);
  
  const closemodal = () => {
    setShowModal(false);
  };
  const openSignupModal =() =>{
    setSignupModal(true);
    
  }
  return (
    <div onClick={closemodal} className="modal">
      <section onClick={(e) => e.stopPropagation()}>
        <header>
          <button onClick={closemodal} className="close">
            X
          </button>

          <div className="modal_title">간편가입 / 로그인</div>
          <div className="modal_title_desc">
            내가 무엇을 구독했는지 관리해보세요!
          </div>
        </header>
        <div className="modal_login_section">
          <input type="text" placeholder="이메일"></input>

          <input
            type="password"
            placeholder="비밀번호(문자,숫자포함 8자 이상)"
          ></input>
        </div>

        <div className="modal_button">
          <div className="email_login_bt">
            <div className="email_login ic">
            </div>
            <span className="email_login_text">로그인</span>
          </div>
          <div onClick = {openSignupModal} className="email_signup bt">
            <div className="email_signup ic">
              <img 
               width='26'
              
              src = "./images/ic_email_sign.svg"></img>
            </div>
            <span className="email_signup text">이메일 회원가입</span>
          </div>
          <div className="google_login bt">
            <div className="google_login ic">
              <img 

              src="./images/googlelogo.png"></img>
            </div>
            <span className="google_login text">Google로 시작하기</span>
          </div>
          <div className="kakao_login bt">
            <div className="kakao_login ic">
              <img width='40'
              src ="./images/kakaologo.png">
              </img>
            </div>
            <span className="kakao_login text">카카오로 시작하기</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SigninModal;
