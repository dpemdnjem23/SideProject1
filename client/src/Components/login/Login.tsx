import React from 'react'


import '../../css/components/Sign/Login.css'
const Login = () =>{

    return(
    
    

      <div className='Login_section'>
        <header>
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

     
      </div>
    

    )
}

export default Login