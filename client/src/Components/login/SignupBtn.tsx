import React from "react";
import { Link } from "react-router-dom";
import "../../css/components/Login/SignupBtn.css";
const SignupBtn = () => {
    //signupBtn을 누르면 signuppage로 연결
  return (
    <div className='id_signup_section'>
           <Link to='/signup'> 
      <div className="id_signup_bt">

        <div className="id_signup_ic">
          <img width="27" src="./images/ic_email_sign.svg"></img>
        </div>
        <span className="id_signup_text">아이디 회원가입</span>
      
      
      </div>
      </Link>
    </div>
  );
};

export default SignupBtn;
