import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";

const SigninModal = ({ setShowModal }:any) => {
  const closemodal = () => {
    setShowModal(false);
  };
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
          <div className="email_signup_bt">
            <div className="email_signup ic">
              <img 
               
              width='25'
              src = "./images/ic_email_sign.svg"></img>
            </div>
            <span className="email_signup text">이메일 회원가입</span>
          </div>
          <div className="google_login_bt">
            <div className="google_login ic">
              <img 

              src="./images/googlelogo.png"></img>
            </div>
            <span className="google_login text">Google로 시작하기</span>
          </div>
          <div className="kakao_login_bt">
            <div className="kakao_login ic">
              <img src ="./images/kakaologo.png">
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
