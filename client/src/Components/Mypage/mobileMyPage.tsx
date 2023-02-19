import React, { useEffect, useState } from "react";

import "../../css/components/MyPage/mobileMyPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { mobileMypageUseStore, showMypageState } from "utils/state";
const MobileMyPage = () => {
  const {
    mobileMenuName,
    mobileMenu,
    setMobileMenu,
    setMobileMenuName,
    setMobilePassEdit,
    setMobileUserEdit,
    mobilePassEdit,
    mobileUserEdit,
  } = mobileMypageUseStore();
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
  const mobileMenuOpenClose = () => {
    setMobileMenu(true);
    setMobilePassEdit(false)
    setMobileUserEdit(false)
    if (mobileMenu) {
      setMobileMenuName('마이페이지')
      setMobileMenu(false);
      setDelUser(false)
      setEditUser(false)
      setPassEditUser(false)
      setSocialEditUser(false)
    }
  };

  //한번더누르면
  return (
    <div onClick={mobileMenuOpenClose} className="MobileMypage">
      <div></div>
      <div>{mobileMenuName}</div>
      {mobileMenu ? (
        <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
      )}
    </div>
  );
};
export default MobileMyPage;
