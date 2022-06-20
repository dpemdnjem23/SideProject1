import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "../../css/common/modal/signupmodal.css";

interface signupmodal {
  openmodal: () => void;
  closemodal: () => void;
  closeSignupModal: () =>void
  // usernameValidation:(username:React.FocusEvent<HTMLInputElement>) =>void
}
axios.defaults.headers.post["Content-Type"] = "application/json";

const SignupModal: React.FC<signupmodal> = ({ openmodal, closemodal,closeSignupModal }) => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");

  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
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
  const spaceBarBlock = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  // 아이디가 잘못 입력 됐을경우 표시
  const usernameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const regUsername = /^[a-z]+[a-z0-9]{6,15}$/g;

    if (!regUsername.test(e.target.value)) {
      setUsernameErrorMessage("아이디를 확인해주세요");

      return false;
      // return false;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/usernamecheck`, {
          username: username
        })
        .then((res) => {
          setUsernameErrorMessage("");
          // return true;
        })
        .catch((err) => {
          setUsernameErrorMessage("중복된 아이디 입니다.");
        
        });
      setUsernameErrorMessage("");
      return true;
    }
  };
  const nicknameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //소문자 대문자 한글 허용 -
    // '   나' 와같은허용하지 않는다. '나     ' 도 허용하지 않는다.
    const regNickname = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,7}$/;

    if (!regNickname.test(e.target.value)) {
      console.log("제대로");
      setNickCheckErrorMessage("닉네임을 확인해주세요");

      return false;
      // return false;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/nickcheck`, {
          nickname: nickname,
        })
        .then((res) => {
          setNickCheckErrorMessage("");
          // return true;
        })
        .catch((err) => {
          console.log(err);
          setNickCheckErrorMessage("중복된 닉네임 입니다.");
        });

      setNickCheckErrorMessage("");
      return true;
    }
  };

  // const validateNickname = () =>{

  // }

  // const validatePassword = () =>{

  // }

  //아이디 검증 아이디를 입력했을때

  // const validateUsername = (username: string) => {
  //   //아이든 6~15자 영,숫자 조합
  //   const regUsername = /^[a-z]+[a-z0-9]{6,15}$/g;

  //   if (!regUsername.test(username)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // const validateCheckPassword = (password: string, passwordCheck: string) => {
  //   if (password !== passwordCheck) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const passwordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 8자이상 16자이하 의 숫자, 문자, 특수문자 조합

    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!regPassword.test(e.target.value)) {
      console.log(password);
      setPassErrorMessage(
        "비밀번호를 8~16자, 숫자, 특수문자,영어를 혼합해주세요"
      );
      return false;
    } else {
      setPassErrorMessage("");

      return true;
    }
  };
  const checkPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //비밀번호 확인
    //1. 비밀번호랑 같은지 확인한다
    //2. 비밀번호 확인이 제대로된 형식인지 확인한다
    //3. 비밀번호가 같다면 제대로된 형식인지, 비밀번호가 다르다면 비밀번호 확인문구
    //4. 만약에 둘다 빈칸인경우가 있어 그런경후 비밀번호 확인메시지로
    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (
      password === e.target.value &&
      password !== "" &&
      e.target.value !== ""
    ) {
      if (!regPassword.test(e.target.value)) {
        console.log(password);

        setPassCheckErrorMessage(
          "비밀번호를 8~16자, 숫자, 특수문자,영어를 혼합해주세요"
        );
        return false;
      } else {
        setPassCheckErrorMessage("");

        return true;
      }
    } else {
      setPassCheckErrorMessage("비밀번호를 확인해주세요");
      return false;
    }
  };

  //모든 유효성 검사가 통과됐으면 회원가입을 진행한다

  const handleSignupRequest = () => {
    //모든 값들이 존재하고, errormessage가 없는경우 회원가입

    // passwordBlur(e)
    // usernameValidation(username)
    // validateCheckPassword(password,passwordCheck)

    // console.log(validateCheckPassword())
    if (
      password &&
      passwordCheck &&
      username &&
      nickname &&
      passCheckErrorMessage === "" &&
      passErrorMessage === "" &&
      usernameErrorMessage === "" &&
      nickCheckErrorMessage === ""
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/signup`, {
          nickname: nickname,
          password: password,
          username: username,
        })
        .then((res) => {
          closeSignupModal()

          //회원가입이 완료되면 회원가입 모달창을 닫는다
        })
        .catch((err) => {
          throw err;
        });
    } else {
      console.log("형이왜여기서 나와");
    }
  };

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

          <span>{usernameErrorMessage}</span>

          <input
            maxLength={16}
            onBlur={passwordBlur}
            onChange={handlePassword}
            type="type"
            name="password"
            placeholder="비밀번호(8~16자 이내의 소문자, 숫자, 특수문자)"
          ></input>
          <span>{passErrorMessage}</span>
          <input
            onBlur={checkPasswordBlur}
            onChange={handlePasswordCheck}
            type="password"
            name="password"
            placeholder="비밀번호 확인"
          ></input>
          <span>{passCheckErrorMessage}</span>
        </div>

        <div className="modal_signup_button_section">
          <div className="signup desc">
            계정 만들기 버튼을 클릭하면, Subgather의 회원이 되실수 있습니다.
          </div>
          <span onClick={handleSignupRequest} className="signup_text">
            계정만들기
          </span>
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
