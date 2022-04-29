import React, { useState } from "react";

import "../../css/common/modal/signinmodal.css";
import "../../css/reset.css"
const SigninModal: React.FC<any> = ({ setShowModal }) => {
  const closemodal = () => {
    setShowModal(false);
  };

  return (
    <div onClick={closemodal} className="modal">
      {/* onClick={(e) => e.stopPropagation()} */}
      <section >
        <header>
          <button onClick={closemodal} className="close">
            X
          </button>
        </header>
        <div className="modal-image">로그인</div>
        <div className="modal-login-input">
          <input type="text" name="username" placeholder="아이디"></input>
          <div className="modal-id"></div>
        </div>

        <div className="modal-login-input">
          <input type="password" name="password" placeholder="비밀번호"></input>
          <div className="modal-password"></div>
        </div>

        <div className="modal-login-button">
          <input type="submit" className="signin-btn"></input>
        </div>

        <div className="modal-signup-button">
          <input type="submit" className="signup-btn"></input>
        </div>
      </section>
    </div>
  );
};

export default SigninModal;
