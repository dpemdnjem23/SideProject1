import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import { showMypageState } from "utils/state";

import "../../css/common/modal/mobileMyPageMenu.css";

const MobileMyPageMenu = () => {


    const {
        setDelUser,
        setEditUser,
        editUser,
        delUser,
        passEditUser,
        setPassEditUser,
        setSocialEditUser,
        socialEditUser,
      } = showMypageState()

  return (
    <div className="MobileMyPageMenu">
      <div className="MobileMyPageMenu_section">
        <div className="MobileMyPageMenu_section_manage">
          <div>섭개더 관리</div>
          <Link to="/noticeBoard">
            <div>구독 모음 관리</div>
          </Link>
          <div>회원 정보 수정</div>
          <div>회원탈퇴</div>
        </div>
      </div>
    </div>
  );
};
export default MobileMyPageMenu;
