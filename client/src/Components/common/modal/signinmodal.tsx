import React from "react";

import "../../../css/common/modal/signinmodal.css";
function SigninModal() {
  const modalopen = () => {};

  const modalclose = () => {};

  return (
    <div className="modal">
      <section>
        <header>
          <button className="close">X</button>
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
}

export default SigninModal;
