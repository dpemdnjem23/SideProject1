import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";

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

          <div className="modal_title">간편가입 / 로그인</div>
          <div className="modal_title_desc">
            내가 무엇을 구독했는지 관리해보세요!
          </div>
        </header>
        <div className="modal_login_section">
          <input type="text" name="username" placeholder="이메일"></input>

          <input
            type="password"
            name="password"
            placeholder="비밀번호(문자,숫자포함 8자 이상)"
          ></input>
        </div>

        <div className="modal_button">
          <div className="email_login_bt">
            <span className="email_login ic"></span>
            로그인
            
          </div>
          <div className="signup_bt">
            <span className="signup ic"></span>
            이메일계정으로 회원가입
          </div>
          <div className="google_login_bt">
            <span className="google_login ic"></span>
            구글계정으로 계속하기
          </div>
          <div className="kakao_login_bt">
            <span className="kakao_login ic"></span>
            카카오계정으로 계속하기
          </div>
        </div>
      </section>
    </div>
  );
};

export default SigninModal;
