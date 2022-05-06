

import React, { useState } from "react";
import "../../css/reset.css";
import "../../css/common/modal/signupmodal.css";

const SignupModal = () => {
  //signumodal은 signmodal에서
  //     //이메일

  //     //비밀번호

  return (
    <div className="modal">
      <section onClick={(e) => e.stopPropagation()}>
        <header>
          <button className="close">X</button>
        </header>
        <div className="modal-image">회원가입</div>

        <div className="modal-signup-input">
          <input type="text" name="username" placeholder="이름"></input>
          <div className="modal-id"></div>
        </div>
        <div className="modal-signup-input">
          <input type="text" name="username" placeholder="이메일"></input>
          <div className="modal-id"></div>
        </div>

        <div className="modal-signup-input">
          <input type="password" name="password" placeholder="비밀번호"></input>
          <div className="modal-password"></div>
        </div>

        <div className="modal-signup-button">
          <input type="submit" className="signup-btn"></input>
        </div>
      </section>
    </div>
  );
};

export default SignupModal;
