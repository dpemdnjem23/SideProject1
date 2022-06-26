import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import "../../css/common/modal/MypageModal.css";

const MypageModal = () => {
  return (
    <div id="MypageModal">
      <div className="MypageModal_section">
        <div>
          <img width="50" src="./images/wallet-6551548.svg" />
          <span>id님의</span>
          <FontAwesomeIcon icon={faCaretRight} />
          <div className="MypageModal_line"></div>
        </div>

        <span>로그아웃</span>
      </div>
    </div>
  );
};

export default MypageModal;
