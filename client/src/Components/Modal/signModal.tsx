import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";
import "../../css/reset.css";
const SigninModal: React.FC<any> = ({ setShowModal }) => {
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
        </header>
        <div className="modal_login_section">
        <div className="modal_title">간편가입 / 로그인</div>
        <div className="modal_title_desc">
          내가 무엇을 구독했는지 관리해보세요!
        </div>
        
          <input type="text" name="username" placeholder="이메일"></input>
          <div className="modal_id"></div>
          <input
            type="password"
            name="password"
            placeholder="비밀번호(문자,숫자포함 8자 이상)"
          ></input>
          <div className="modal_password"></div>
        </div>

        <div className="modal_login_button">
          <span className="email_login_bt">
            <span className="email_login_ic">로그인</span>
          </span>
          <span className = 'signup_bt'>
            <span className = 'signup_ic'>이메일계정으로 회원가입</span>
          </span>
          <span className="google_login_bt">
            <span className="google_login_ic">구글계정으로 계속하기</span>
          </span>
          <span className="kakao_login_bt">
            <span className="kakao_login_ic">카카오계정으로 계속하기</span>
          </span>
        </div>
        
      </section>
    </div>
  );
};

export default SigninModal;
