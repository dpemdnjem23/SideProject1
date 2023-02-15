import React, { useEffect, useState } from "react";

import "../../css/components/MyPage/mobileMyPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { mobileMypageUseStore } from "utils/state";
const MobileMyPage = () => {
  const { setMobileMenu, mobileMenu } = mobileMypageUseStore();

  const mobileMenuOpenClose = () => {
    setMobileMenu(true);
    if (mobileMenu) {
      setMobileMenu(false);
    }
  };

  //한번더누르면
  return (
    <div onClick={mobileMenuOpenClose} className="MobileMypage">
      <div></div>
      <div>마이페이지</div>
      {mobileMenu ? (
        <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
      )}
    </div>
  );
};
export default MobileMyPage;
