import React from "react";
import { Link } from "react-router-dom";


import '../../css/components/Signup/SignupTitle.css'
const SignupTitle = () => {
  return (
    <header>
      <div className="Signup_title">회원가입</div>
      <div className="already_account">
        이미 가입 하셨나요?
        <Link to="/login"> 로그인</Link>
      </div>
    </header>
  );
};

export default SignupTitle;
