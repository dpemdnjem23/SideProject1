import React, { useEffect, useState, useRef, MouseEventHandler } from "react";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import { mobileMypageUseStore, showMypageState } from "utils/state";

import "../../css/common/modal/mobileMyPageMenu.css";

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
  const { mobileMenuName, setMobileMenuName } = mobileMypageUseStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const energy = e.target as HTMLDivElement;

    const textContent: string | null = energy.textContent;

    setMobileMenuName(textContent);
  };

  return (
    <div className="MobileMyPageMenu">
      <div className="MobileMyPageMenu_section">
        <div className="MobileMyPageMenu_section_manage">
          <div>섭개더 관리</div>
          <Link to="/noticeBoard">
            <div>구독 모음 관리</div>
          </Link>
          <div onClick={handleClick} className="MobileMyPageMenu_menu">
            회원 정보 수정
          </div>
          <div onClick={handleClick} className="MobileMyPageMenu_menu">
            회원탈퇴
          </div>
        </div>
      </div>
    </div>
  );
};
export default MobileMyPageMenu;
