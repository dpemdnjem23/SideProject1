import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

import "../../css/components/Signup/Signup.css";

type validateUserInfo = {
  usernameValidate: boolean;

  passwordValidate: boolean;

  passwordCheckValidate: boolean;

  nicknameValidate: boolean;
};

const Signup = () => {
  const navigate = useNavigate();

  //check를 줘야한다.
  const [validateAllCheck, setValidateAllCheck] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [validateUserInfo, setValidateUserInfo] = useState<validateUserInfo>({
    usernameValidate: false,
    passwordValidate: false,
    passwordCheckValidate: false,
    nicknameValidate: false,
  });

  //아이디, 비밀번호, 비밀번호확인, 닉네임
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");

  const [nickname, setNickname] = useState<string>("");
  //에러메시지
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>("");
  const [passErrorMessage, setPassErrorMessage] = useState<string>("");
  const [passCheckErrorMessage, setPassCheckErrorMessage] =
    useState<string>("");
  const [nickCheckErrorMessage, setNickCheckErrorMessage] =
    useState<string>("");

  //모든게 true일경우 validateAllCheck를 true로
  // useEffect(()=>{
  //     if()

  // },[])
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
      setValidateUserInfo({ ...validateUserInfo, usernameValidate: false });

      // return false;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/usernamecheck`, {
          username: username,
        })
        .then((res) => {
          setUsernameErrorMessage("");
          setValidateUserInfo({ ...validateUserInfo, usernameValidate: true });
          console.log(validateUserInfo, "user");

          // return true;
        })
        .catch((err) => {
          setUsernameErrorMessage("중복된 아이디 입니다.");
        });
      setUsernameErrorMessage("");
      setValidateUserInfo({ ...validateUserInfo, usernameValidate: true });
      console.log(validateUserInfo.usernameValidate);

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
      setValidateUserInfo({ ...validateUserInfo, nicknameValidate: false });

      // return false;
      // return false;
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/nickcheck`, {
          nickname: nickname,
        })
        .then((res) => {
          setNickCheckErrorMessage("");
          setValidateUserInfo({ ...validateUserInfo, nicknameValidate: true });

          // return true;
        })
        .catch((err) => {
          console.log(err);
          setNickCheckErrorMessage("중복된 닉네임 입니다.");
          setValidateUserInfo({ ...validateUserInfo, nicknameValidate: false });
        });

      setNickCheckErrorMessage("");
      setValidateUserInfo({ ...validateUserInfo, nicknameValidate: true });

      return true;
    }
  };
  const passwordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 8자이상 16자이하 의 숫자, 문자, 특수문자 조합

    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!regPassword.test(e.target.value)) {
      setPassErrorMessage(
        "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
      );

      setValidateUserInfo({ ...validateUserInfo, passwordValidate: false });
    } else {
      setValidateUserInfo({ ...validateUserInfo, passwordValidate: true });

      setPassErrorMessage("");
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
        setValidateUserInfo({
          ...validateUserInfo,
          passwordCheckValidate: false,
        });

        setPassCheckErrorMessage(
          "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
        );
      } else {
        setValidateUserInfo({
          ...validateUserInfo,
          passwordCheckValidate: true,
        });

        setPassCheckErrorMessage("");
      }
    }
    
    else if(  password !== e.target.value &&
      password !== "" &&
      e.target.value !== "") {
      setValidateUserInfo({
        ...validateUserInfo,
        passwordCheckValidate: false,
      });

      setPassCheckErrorMessage('비밀번호를 확인해주세요'      );
    }
  };

  useEffect(() => {
    if (
      validateUserInfo.nicknameValidate &&
      validateUserInfo.passwordCheckValidate &&
      validateUserInfo.passwordValidate &&
      validateUserInfo.usernameValidate
      // validateAllCheck
    ) {
      setValidateAllCheck(true);
    } else {
      setValidateAllCheck(false);
    }
  }, [
    validateUserInfo.nicknameValidate,
    validateUserInfo.passwordCheckValidate,
    validateUserInfo.passwordValidate,
    validateUserInfo.usernameValidate,
    validateAllCheck,
  ]);

  //모든 유효성 검사가 통과됐으면 회원가입을 진행한다

  const handleSignupRequest = () => {
    //모든 값들이 존재하고, errormessage가 없는경우 회원가입

    // passwordBlur(e)
    // usernameValidation(username)
    // validateCheckPassword(password,passwordCheck)

    // console.log(validateCheckPassword())

    console.log(validateAllCheck);
    if (validateAllCheck) {
      axios
        .post(`${process.env.REACT_APP_API_URI}/auth/signup`, {
          nickname: nickname,
          password: password,
          username: username,
        })
        .then((res) => {
          console.log("출");
          navigate("/login");
          //회원가입이 완료되면 로그인창으로 다시 넘어간다.
        })
        .catch(() => {
          //회원가입 실패하는경우
        });
    } else {
      //회원가입을 눌럿을때 만약
      //  정보가 입력이 됐고 true인 상황이면 errormessage 변경이 필요없다.

      //계정만들기시 pass가 존재 하고 validate false인경우
      // 확인해주세요 문구
      //계정만들기시 pass가 없고 validate flase인경우
      //비밀번호 혼합해주세요
      if (!password && !passwordCheck) {
        setPassCheckErrorMessage(
          "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
        );
      }
      else if(password&&!passwordCheck){
        setPassCheckErrorMessage(
         '비밀번호를 확인해주세요'
        );
      }
      // setPassCheckErrorMessage("비밀번호를 확인해주세요");

      if (validateUserInfo.passwordValidate&&!validateUserInfo.passwordCheckValidate) {
        setPassCheckErrorMessage(
          '비밀번호를 확인해주세요'
        );
      } 

      if (validateUserInfo.usernameValidate) {
        setUsernameErrorMessage("");
      } else {
        setUsernameErrorMessage("아이디를 확인해주세요");
      }
      if (validateUserInfo.passwordValidate) {
        setPassErrorMessage("");
      } else {
        setPassErrorMessage(
          "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
        );
      }

      if (validateUserInfo.nicknameValidate) {
        setNickCheckErrorMessage("");
      } else {
        setNickCheckErrorMessage("닉네임을 확인해주세요");
      }

      // setPassCheckErrorMessage('')
      // setNickCheckErrorMessage('')
      // setPassErrorMessage('')

      //만약 닉네임이 입력됐고, 통과된경우
      //아무것도입력이 안됐는데 만약 회원가입 버튼을 누르면 모든 message활성화
    }
  };

  return (
    <div className="Signup">
      <div className="Signup_section">
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
          type="password"
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
        <div className="Signup_bottom_section">
          <div className="Signup_desc">
            <span>
              계정 만들기 버튼을 클릭하면, Subgather의 회원이 되실수 있습니다.
            </span>
          </div>

          <div
            onClick={() => handleSignupRequest()}
            className="Signup_Btn_section"
          >
            <span className="Signup_Btn_text">계정만들기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
