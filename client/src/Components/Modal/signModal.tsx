import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";
import "../../css/reset.css"
const SigninModal: React.FC<any> = ({ setShowModal }) => {
  const closemodal = () => {
    setShowModal(false);

  };
  return (
    <div onClick={closemodal} className="modal">
    
      <section onClick={(e) => e.stopPropagation()} >
        <header>
          <button onClick={closemodal} className="close">
            X
          </button>
        </header>
        <div className="modal-image">간편가입 / 로그인</div>
        <div className ="modal-image-bottom">내가 무엇을 구독했는지 관리해보세요!</div>
        <div className="modal-login-input">
          <input type="text" name="username" placeholder="이메일"></input>
          <div className="modal-id"></div>
        </div>

        <div className="modal-login-input">
          <input type="password" name="password" placeholder="비밀번호(문자,숫자포함 8자 이상)"></input>
          <div className="modal-password"></div>
        </div>

        <div className="modal-login-button">
          <span className="email_login_bt">로그인</span>
          <span className='facebook_login_bt'></span>
          <span className='kakao_login_bt'></span>
   
          
        </div>

     
      </section>
    </div>
  );
};

export default SigninModal;
