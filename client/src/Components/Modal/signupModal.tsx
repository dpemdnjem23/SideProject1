import React, { useState } from "react";

import "../../css/common/modal/signupmodal.css";

interface signupmodal {
  openmodal: () => void;
  closemodal:() =>void;
}
const SignupModal: React.FC<signupmodal> = ({ openmodal,closemodal}) => {
  
 
  //signumodal은 signmodal에서
  //     //이메일

  //     //비밀번호

  return (
    <div onClick={()=>closemodal()}  className="signup_modal">
      <section onClick={(e) => e.stopPropagation()}>
        <header>
          <button onClick={()=>closemodal()} className="close">
            X
          </button>

          <div className="modal_signup_title">회원가입</div>
        </header>
        <div className="modal_signup_section">
          <input type="text" name="username" placeholder="이름"></input>

          <input type="text" name="username" placeholder="이메일"></input>

          <input
            type="password"
            name="password"
            placeholder="비밀번호(문자,숫자조합 8자 이상)"
          ></input>
        </div>

        <div className="modal_signup_button_section">
          <div className="signup desc">
            계정 만들기 버튼을 클릭하면, Subgather의 회원이 되실수 있습니다.
          </div>
          <span className="signup_text">계정만들기</span>
          <div className ='already_account'>
            이미 가입 하셨나요?
            <a onClick={()=>openmodal()}> 로그인</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupModal;
