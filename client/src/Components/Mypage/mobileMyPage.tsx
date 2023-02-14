import React, { useEffect, useState } from "react";

import "../../css/components/MyPage/mobileMyPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
const MobileMyPage = () => {
  return (
    <div className="MobileMypage">
      <div></div>
      <div>마이페이지</div>
      <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
    </div>
  );
};
export default MobileMyPage;
