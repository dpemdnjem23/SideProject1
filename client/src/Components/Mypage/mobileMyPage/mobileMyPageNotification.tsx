import React, { useState } from "react";
import {
  mobileMypageUseStore,
  mypageNotiModalState,
  mypageUserInfoState,
  showMypageState,
} from "utils/state";
import axios from "axios";
import { useNavigate } from "react-router";

import "../../../css/components/MyPage/MobileMyPage/mobileMyPageNotification.css";
import { instance } from "App";
const MobileMyPageNotification = () => {
  const { nickname } = mypageUserInfoState();

  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { setEditUser, editUser } = showMypageState();

  const { mobileNoti, setMobileNoti } = mobileMypageUseStore();

  const userInfo: { nickname: string } = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );
  const { setShowNicknameNotiModal, showNicknameNotiModal } =
    mypageNotiModalState();

  const handleNicknameNoti = () => {
    setMobileNoti(false);
    setShowNicknameNotiModal(false);
    // setMobileNoti(true)
  };

  const handleModifyNickname = () => {
    //닉네임을 체크하고, 동일한 닉네임이 없다면 변경한다.
    instance
      .patch(`/user/edit`, {
        nickname: nickname,
      })
      .then((res) => {
        setMobileNoti(false);
        setEditUser(false);
        navigate("/");
        //userInfo storage에 닉네임 재할당
      })
      .catch((err) => {
        //
        setMobileNoti(false);
        console.log(err);
      });
    //변경하기를 누르는 순간 => 닉네임이 동일한지 체크해야된다.
  };
  return (
    <div className="mobileMyPageNoti">
      <div className="mobileMyPageNoti_section">
        <div className="mobileMyPageNoti_cancel">
          <button onClick={handleNicknameNoti}>변경취소</button>
        </div>

        <div className="mobileMyPageNoti_title">
          <span>정말 닉네임을 변경 하시겠습니까?</span>
        </div>
        <div className="mobileMyPageNoti_contents">
          <span>
            확인을 누르면 닉네임이 변경됩니다. 원하지 않는다면 취소 버튼을
            눌러주세요
          </span>
        </div>
        <div className="mobileMyPageNoti_bt">
          <button
            onClick={handleModifyNickname}
            className="mobileMyPageNoti_rightbt"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMyPageNotification;
