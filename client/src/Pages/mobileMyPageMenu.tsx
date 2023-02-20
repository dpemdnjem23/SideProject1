import MobileMyPageNotification from "Components/Mypage/mobileMyPage/mobileMyPageNotification";
import MobileMyPageUserEdit from "Components/Mypage/mobileMyPage/mobileMyPageUserEdit";
import MobileMyPagePassEdit from "Components/Mypage/mobileMyPage/mobileMyPagePassEdit";
import MobileMyPageSocialEdit from "Components/Mypage/mobileMyPage/mobileMyPageSocialEdit";
import React, { useEffect, useState, useRef, MouseEventHandler } from "react";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import { mobileMypageUseStore, showMypageState } from "utils/state";

import "../css/pages/mobileMyPageMenu.css";
import { userInfo } from "os";
import MobileMyPageSocial from "Components/Mypage/mobileMyPage/mobileMyPageSocialEdit";

const MobileMyPageMenu = () => {
  // const

  const {
    setDelUser,
    setEditUser,
    editUser,
    delUser,
    passEditUser,
    setPassEditUser,
    setSocialEditUser,
    socialEditUser,
  } = showMypageState();

  const {
    mobileMenuName,
    setMobileMenuName,
    setMobilePassEdit,
    setMobileUserEdit,
    mobilePassEdit,
    mobileUserEdit,
  } = mobileMypageUseStore();

  const userinfo = JSON.parse(
    localStorage.getItem("subgatherUserInfo") || `{}`
  );

  const handleEditClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const energy = e.target as HTMLDivElement;

    const textContent: string | null = energy.textContent;

    setMobileMenuName(textContent);
    setMobileUserEdit(true);
    setEditUser(true);
  };
  const handleWithdrawalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const energy = e.target as HTMLDivElement;

    const textContent: string | null = energy.textContent;

    setMobileMenuName(textContent);
  };

  //editUser && userinfo.social_user

  return (
    <div className="MobileMyPageMenu">
      <div className="MobileMyPageMenu_section">
        {mobileUserEdit && userinfo.social_user === true ? (
          <MobileMyPageSocial></MobileMyPageSocial>
        ) : null}
        {mobileUserEdit && userinfo.social_user === false ? (
          <MobileMyPageUserEdit></MobileMyPageUserEdit>
        ) : null}

        {mobileUserEdit ? null : (
          <div className="MobileMyPageMenu_section_manage">
            <div>섭개더 관리</div>
            <Link to="/noticeBoard">
              <div>구독 모음 관리</div>
            </Link>

            <div onClick={handleEditClick} className="MobileMyPageMenu_menu">
              회원 정보 수정
            </div>

            <div
              onClick={handleWithdrawalClick}
              className="MobileMyPageMenu_menu"
            >
              회원탈퇴
            </div>
          </div>
        )} 
      </div>
    </div>
  );
};
export default MobileMyPageMenu;
