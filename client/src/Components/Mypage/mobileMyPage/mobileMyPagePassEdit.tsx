import React, { useState } from "react";
import {
  mobileMypageUseStore,
  mypageNotiModalState,
  mypageUserInfoState,
  showMypageState,
} from "utils/state";

type validateUserInfo = {
  passwordValidate: boolean;

  passwordCheckValidate: boolean;
};

import "../../../css/components/MyPage/MobileMyPage/mobileMyPagePassEdit.css";
const MobileMyPagePassEdit = () => {
  // const userinfo:string|null =JSON.parse(localStorage.getItem('subgatherUserInfo')||"{}")
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { setPassword, password, setPasswordCheck, passwordCheck } =
    mypageUserInfoState();

  const { showPasswordNotiModal, setShowPasswordNotilModal } =
    mypageNotiModalState();
  const [passErrMessage, setPassErrMessage] = useState<string>("");
  const [passCheckErrMessage, setPassCheckErrMessage] = useState<string>("");
  const [validateUserInfo, setValidateUserInfo] = useState<validateUserInfo>({
    passwordValidate: false,
    passwordCheckValidate: false,
  });

  const {
    mobileMenuName,
    mobileMenu,
    setMobileMenu,
    setMobileMenuName,
    setMobilePassEdit,
    setMobileUserEdit,
    mobilePassEdit,
    mobileUserEdit,
    setMobileNoti
  } = mobileMypageUseStore();

  const { setShowNicknameNotiModal, showNicknameNotiModal } =
  mypageNotiModalState()
  const passwordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 8자이상 16자이하 의 숫자, 문자, 특수문자 조합

    const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

    if (!regPassword.test(e.target.value)) {
      setPassErrMessage(
        "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
      );

      setValidateUserInfo({ ...validateUserInfo, passwordValidate: false });
    } else {
      setValidateUserInfo({ ...validateUserInfo, passwordValidate: true });

      setPassErrMessage("");
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
        setValidateUserInfo({
          ...validateUserInfo,
          passwordCheckValidate: false,
        });

        setPassCheckErrMessage(
          "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
        );
      } else {
        setValidateUserInfo({
          ...validateUserInfo,
          passwordCheckValidate: true,
        });

        setPassCheckErrMessage("");
      }
    } else if (
      password !== e.target.value &&
      password !== "" &&
      e.target.value !== ""
    ) {
      setValidateUserInfo({
        ...validateUserInfo,
        passwordCheckValidate: false,
      });
      setPassCheckErrMessage("비밀번호를 확인해주세요");
    }
  };

  const handlePsssModifyBt = () => {
    if (
      validateUserInfo.passwordCheckValidate &&
      validateUserInfo.passwordValidate
    ) {
      //
      setShowPasswordNotilModal(true);
    } else {
      const regPassword =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;

      if (!regPassword.test(password)) {
        setPassErrMessage(
          "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
        );
      }
      if (!regPassword.test(passwordCheck)) {
        setPassCheckErrMessage(
          "비밀번호를 8~16자 소문자, 숫자, 특수문자 혼합해주세요"
        );
      }
      if (
        regPassword.test(passwordCheck) &&
        regPassword.test(password) &&
        password !== passwordCheck
      ) {
        setPassCheckErrMessage("비밀번호가 일치하지 않습니다.");
        setPassErrMessage("");
      }
    }
    //passcheck!==pass 일치x
    //pass가 입력, reg에 맞지 않는경우
  };

  const handleUserPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPassErrMessage("");
  };

  const handleUserPassCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    setPassCheckErrMessage("");
  };

  const handleNicknameNoti = () => {
    setMobileNoti(false);
    setMobilePassEdit(false)
    setShowNicknameNotiModal(false);
    // setMobileNoti(true)
  };
  //   MobileMyPage
  return (
    <div id="MobileMyPage_passEdit">
      <div className="MobileMyPage_passEdit_section">

      <div className="mobileMyPageNoti_cancel">
          <button onClick={handleNicknameNoti}>변경취소</button>
        </div>
        <div className="MobileMyPage_passEdit_title">
          <div>{'< 변경할 비밀번호를 입력해주세요 >'}</div>
        </div>
        <div className="MobileMyPage_passEdit_pass passsection sts">
          <div className="MobileMyPage_passEdit_description">비밀번호</div>
          <div className="MobileMyPage_passEdit_pass passsubsection">
            <input
              onBlur={passwordBlur}
              onChange={handleUserPass}
              type="password"
              className="MobileMyPage_passEdit_contents"
            ></input>
          </div>
        </div>
        <span className="MobileMyPage_passEdit_err">{passErrMessage}</span>

        <div className="Mypgae_passdit_gap2"></div>
        <div className="MobileMyPage_passEdit_passcheck passsection">
          <div className="MobileMyPage_passEdit_description">비밀번호 확인</div>

          <div className="MobileMyPage_passEdit_passcheck_sub passsubsection">
            <input
              onBlur={checkPasswordBlur}
              onChange={handleUserPassCheck}
              type="password"
              className="MobileMyPage_passEdit_contents"
            ></input>
          </div>
        </div>

        <span className="MobileMyPage_passEdit_err">{passCheckErrMessage}</span>

        <div className="MobileMyPage_passEdit_btsection">
          <button
            onClick={handlePsssModifyBt}
            className="MobileMyPage_passEdit_bt"
          >
            변경완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMyPagePassEdit;
