import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "../../css/common/modal/signupmodal.css";

interface signupmodal {
  openmodal: () => void;
  closemodal: () => void;
  // usernameValidation:(username:React.FocusEvent<HTMLInputElement>) =>void
}
const SignupModal: React.FC<signupmodal> = ({ openmodal, closemodal }) => {
  const navigation = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");

  const [usernamelErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [passErrorMessage, setPassErrorMessage] = useState<string>("");
  const [passCheckErrorMessage, setPassCheckErrorMessage] =
    useState<string>("");
  const [nickCheckErrorMessage, setNickCheckErrorMessage] =
    useState<string>("");
  //닉네임 이메일 비민번호

  //signumodal은 signmodal에서

  //변화를 감지해서 체킹하는데 사용
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };
  const handleNick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  //스페이스바 입력금지시키기
  const spaceBarBlock = (e:React.KeyboardEvent<HTMLInputElement>) =>{
  
    if(e.key==='SPACE'){
      e.preventDefault
    }
   
  }
  // 아이디가 잘못 입력 됐을경우 표시
  const usernameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const regUsername = /^[a-z]+[a-z0-9]{6,15}$/g;

    if (!regUsername.test(e.target.value)) {
      setUsernameErrorMessage("아이디를 확인해주세요");

      return false;
      // return false;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URI}auth/usernamecheck`,
          { username: username },
          { headers: { "content-Type": "application/json" } }
        )
        .then((res) => {
          
          setUsernameErrorMessage("");
          // return true;
        })
        .catch((err) => {
           setUsernameErrorMessage("중복된 아이디 입니다.");
          
         
        });

      console.log("retetetet");
      setUsernameErrorMessage("");
      return true;
    }
  };
  const nicknameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //소문자 대문자 한글 허용 -
    const regNickname = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,7}$/g

    if (!regNickname.test(e.target.value)) {
      console.log("제대로");
      setNickCheckErrorMessage("닉네임을 확인해주세요");

      return false;
      // return false;
    } else {
      axios
      .post(
        `${process.env.REACT_APP_API_URI}auth/nickcheck`,
        { nickname: nickname },
        { headers: { "content-Type": "application/json" } }
      )
      .then((res) => {
        
        setUsernameErrorMessage("");
        // return true;
      })
      .catch((err) => {
         setUsernameErrorMessage("중복된 아이디 입니다.");
        
      })
      
      setNickCheckErrorMessage("");
      return true;
    

    }




  };

  //아이디 검증 아이디를 입력했을때
  const usernameValidation = (username: string) => {
    //아이든 6~15자 영,숫자 조합
    const regUsername = /^[a-z]+[a-z0-9]{6,15}$/g;

    if (!regUsername.test(username)) {
      console.log("제대로");
      setUsernameErrorMessage("아이디를 제대로 입력해주세요");
      return false;
    } else {
      setUsernameErrorMessage("");
      return true;
    }
  };
  // usernameValidation(username)
  //     //이메일

  //     //비밀번호

  return (
    <div onClick={() => closemodal()} className="signup_modal">
      <section onClick={(e) => e.stopPropagation()}>
        <header>
          <button onClick={() => closemodal()} className="close">
            X
          </button>

          <div className="modal_signup_title">회원가입</div>
        </header>
        <div className="modal_signup_section">
          <input
          onKeyDown={spaceBarBlock}
          onBlur={nicknameBlur}
            onChange={handleNick}
            maxLength={7}
            type="text"
            name="username"
            placeholder="이름(2~7자 특수문자 불가)"
          ></input>
          <span>{nickCheckErrorMessage}</span>

          <input
            onBlur={usernameBlur}
            maxLength={15}
            onChange={handleUsername}
            type="text"
            name="username"
            placeholder="ID(6~15자 영문,숫자)"
          ></input>

          <span>{usernamelErrorMessage}</span>

          <input
            onChange={handlePassword}
            type="password"
            name="password"
            placeholder="비밀번호(8~15자 이내의 소문자, 숫자, 특수문자)"
          ></input>
          <input
            onChange={handlePasswordCheck}
            type="password"
            name="password"
            placeholder="비밀번호 확인"
          ></input>
        </div>

        <div className="modal_signup_button_section">
          <div className="signup desc">
            계정 만들기 버튼을 클릭하면, Subgather의 회원이 되실수 있습니다.
          </div>
          <span className="signup_text">계정만들기</span>
          <div className="already_account">
            이미 가입 하셨나요?
            <a onClick={() => openmodal()}> 로그인</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupModal;
